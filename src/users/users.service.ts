import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { ConfigService } from '@nestjs/config';
import { PublicActivity } from 'src/public-activity/entities/public-activity.entity';
const Mailjet = require('node-mailjet');
@Injectable()
export class UsersService {
  private readonly mailjet: any;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
  ) {
    this.mailjet = Mailjet.apiConnect(
      this.configService.get<string>('MJ_APIKEY_PUBLIC'),
      this.configService.get<string>('MJ_APIKEY_PRIVATE'),
    );
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const company = await this.entityManager.findOne(Company, { where: { id: createUserDto.company_id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${createUserDto.company_id} not found`);
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email, activeStatus: true }
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new User({
      ...createUserDto,
      company: company
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {

    return this.userRepository.find({
      relations: ['company'],
    });

  }

  async findOne(id: number): Promise<User> {

    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['company']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    const user = await this.findOne(id);
    user.role = updateUserDto.role;
    user.position = updateUserDto.position;
    
    return this.userRepository.save(user);

  }

  async remove(id: number): Promise<void> {

    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, activeStatus: true },
      relations: ['company'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createNewUser(createNewUserDto: CreateNewUserDto): Promise<User> {
    const company = await this.entityManager.findOne(Company, { where: { id: createNewUserDto.company_id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${createNewUserDto.company_id} not found`);
    }

    const existingUser = await this.userRepository.findOneBy({ email: createNewUserDto.email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new User({
      ...createNewUserDto,
      company: company
    });

    let companyEmail = "isuraran@gmail.com";
    let companyName = "isura";

    let userEmail = user.email;
    let userName = user.name;
    let userPassword = createNewUserDto.password;
    let loginUrl =  this.configService.get<string>('LOGIN_URL');

    const request = this.mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: companyEmail,
              Name: companyName
            },
            To: [
              {
                Email: userEmail,
                Name: userName
              }
            ],
            Subject: "Welcome to Our Company!",
            TextPart: `Dear ${userName}, welcome to our company! Here are your login credentials`,
            HTMLPart: `
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                  }
                  .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  }
                  h3 {
                    color: #333333;
                    text-align: center;
                  }
                  p {
                    color: #666666;
                    line-height: 1.5;
                    text-align: center;
                  }
                  .credentials {
                    background-color: #f9f9f9;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    text-align: left;
                  }
                  .login-button {
                    display: block;
                    width: fit-content;
                    padding: 10px 20px;
                    color: #ffff;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    margin: 0 auto;
                    text-align: center;
                  }
                  .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #999999;
                    font-size: 12px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h3>Dear ${userName}, welcome to our company!</h3>
                  <p>We are excited to have you on board. Here are your login credentials:</p>
                  <div class="credentials">
                    <p><strong>Email:</strong> ${userEmail}</p>
                    <p><strong>Password:</strong> ${userPassword}</p>
                  </div>
                  <a href="${loginUrl}" class="login-button">Login</a>
                  <p>May the success be with you!</p>
                  <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Our Company. All rights reserved.</p>
                  </div>
                </div>
              </body>
              </html>
          `
          }
        ]
      });

    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });

      const savedUser = await this.userRepository.save(user);

      const publicActivity = this.entityManager.create(PublicActivity, {
        company,
        notificationText: `New user added: ${user.name}`,
        user: savedUser,
        activityType: '1', 
      });
  
      await this.entityManager.save(publicActivity);
  
      return savedUser;

  }

}


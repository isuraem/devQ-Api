import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const company = await this.entityManager.findOne(Company, { where: { id: createUserDto.company_id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${createUserDto.company_id} not found`);
    }

    const existingUser = await this.userRepository.findOneBy({ email: createUserDto.email });
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
      where: { email },
      relations: ['company'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

}


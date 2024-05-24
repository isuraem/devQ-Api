import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly entityManager: EntityManager,
  ){}

  async create(createCompanyDto: CreateCompanyDto) {

    const company = new Company(createCompanyDto);
    const savedCompany = await this.entityManager.save(company);
    return savedCompany;
    
  }

  async findAll() {

    return await this.companyRepository.find({
      relations: {
        users: true,
      }
    });

  }

  async findOne(id: number) {

    const user = await this.companyRepository.findOne({ 
      where: { id },
      relations: ['users'] 
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {

    const company = await this.findOne(id);
    company.name = updateCompanyDto.name;
    company.email = updateCompanyDto.email;
    return this.entityManager.save(company);  

  }

  async remove(id: number): Promise<void> {

    const result = await this.companyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

  }
}

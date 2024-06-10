import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthorizationGuard)
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<{ success: boolean, data?: Company, error?: string }> {
    try {
      const company = await this.companyService.create(createCompanyDto);
      return { success: true, data: company };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  async findAll(): Promise<{ success: boolean, data?: Company[], error?: string }> {
    try {
      const companies = await this.companyService.findAll();
      return { success: true, data: companies };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @UseGuards(AuthorizationGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ success: boolean, data?: Company, error?: string }> {
    try {
      const company = await this.companyService.findOne(+id);
      if (!company) {
        throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, data: company };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto): Promise<{ success: boolean, data?: Company, error?: string }> {
    try {
      const updatedCompany = await this.companyService.update(+id, updateCompanyDto);
      return { success: true, data: updatedCompany };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean, error?: string }> {
    try {
      await this.companyService.remove(+id);
      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

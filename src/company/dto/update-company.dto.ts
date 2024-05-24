import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;
}

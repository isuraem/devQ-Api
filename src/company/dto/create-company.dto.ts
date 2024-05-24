import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateCompanyDto {

    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;
}

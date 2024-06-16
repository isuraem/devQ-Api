import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CreateNewUserDto {

    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;

    @IsNotEmpty()
    role: number;

    @IsNotEmpty()
    position: string;

    company_id: number;

    password: string;
    
}

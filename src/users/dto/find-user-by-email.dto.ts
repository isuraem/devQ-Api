import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class FindUserByEmailDto {
    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string
}

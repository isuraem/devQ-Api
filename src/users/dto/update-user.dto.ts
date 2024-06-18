import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsInt()
  role?: number;

  @IsOptional()
  @IsString()
  position?: string;
}

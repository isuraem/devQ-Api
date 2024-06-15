import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePublicActivityDto {

    companyId: number;

    @IsString()
    notificationText: string;

    @IsOptional()
    userId?: number;

    @IsOptional()
    questionId?: number;
}


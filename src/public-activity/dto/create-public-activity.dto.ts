import { IsInt, IsOptional, IsString, IsEnum } from 'class-validator';

export class CreatePublicActivityDto {
    @IsInt()
    companyId: number;

    @IsString()
    notificationText: string;

    @IsOptional()
    @IsInt()
    userId?: number;

    @IsOptional()
    @IsInt()
    questionId?: number;

    @IsOptional()
    activityType?: string;
}

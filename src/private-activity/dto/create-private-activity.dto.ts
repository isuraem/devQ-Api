import { IsInt, IsEnum, IsOptional } from 'class-validator';

export class CreatePrivateActivityDto {
    @IsInt()
    userId: number;

    @IsOptional()
    activityType?: string;

    @IsInt()
    performedById: number;

    @IsOptional()
    @IsInt()
    questionId?: number;

    @IsOptional()
    @IsInt()
    answerId?: number;
}

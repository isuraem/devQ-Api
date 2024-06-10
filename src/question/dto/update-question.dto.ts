import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsNotEmpty } from "class-validator";

export class  UpdateQuestionDto {
    @IsNotEmpty()
    title: string;

    description: string;
}
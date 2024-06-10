import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnswerDto {
    @IsNotEmpty()
    @IsString()
    answer_text: string;
  }
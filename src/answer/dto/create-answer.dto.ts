import { IsNotEmpty } from "class-validator";

export class CreateAnswerDto {
    @IsNotEmpty()
    answer_text: string;
    
    @IsNotEmpty()
    question_id: number;

    @IsNotEmpty()
    user_id: number;
}

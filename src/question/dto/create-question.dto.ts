import { IsNotEmpty } from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    title: string;

    description: string;
    
    @IsNotEmpty()
    user_id: number;

    status: boolean;

    tags: string[];

}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany} from "typeorm";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answer_text: string;

    @ManyToOne(() => Question, (question) => question.answers)
    @JoinColumn({
        name: 'question_id'
    })
    question: Question;


    @ManyToOne(() => User, (user) => user.answers)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;



    constructor(answer: Partial<Answer>){
        Object.assign(this, answer)
    }  
}

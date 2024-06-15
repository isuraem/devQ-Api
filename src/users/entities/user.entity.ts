import { Company } from "src/company/entities/company.entity";
import { Question } from "src/question/entities/question.entity";
import { Answer } from "src/answer/entities/answer.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { QuestionLike } from "src/question-like/entities/question-like.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    role: number;
    
    @ManyToOne(() => Company, (company) => company.users)
    @JoinColumn({
        name: 'company_id'
    })
    company: Company

    @OneToMany(() => Question, (question) => question.user)
    questions: Question[]

    @OneToMany(() => Answer, (answer) => answer.user)
    answers: Answer[]

    @OneToMany(() => QuestionLike, (like) => like.user)
    likes: QuestionLike[];

    constructor(user: Partial<User>){
        Object.assign(this, user)
    }  
}

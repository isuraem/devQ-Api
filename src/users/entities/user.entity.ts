import { Company } from "src/company/entities/company.entity";
import { Question } from "src/question/entities/question.entity";
import { Answer } from "src/answer/entities/answer.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { QuestionLike } from "src/question-like/entities/question-like.entity";
import { PublicActivity } from "src/public-activity/entities/public-activity.entity";
import { PrivateActivity } from "src/private-activity/entities/private-activity.entity";
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

    @Column()
    position: string;
    
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

    @OneToMany(() => PublicActivity, publicActivity => publicActivity.user)
    publicActivities: PublicActivity[];

    @OneToMany(() => PrivateActivity, privateActivity => privateActivity.user)
    privateActivities: PrivateActivity[];
  
    @OneToMany(() => PrivateActivity, privateActivity => privateActivity.performedBy)
    performedActivities: PrivateActivity[];
    
    constructor(user: Partial<User>){
        Object.assign(this, user)
    }  
}

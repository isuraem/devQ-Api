import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { PrivateActivity } from "src/private-activity/entities/private-activity.entity";

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

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    
    @ManyToOne(() => User, (user) => user.answers)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;

    @OneToMany(() => PrivateActivity, privateActivity => privateActivity.answer)
    privateActivities: PrivateActivity[];

    constructor(answer: Partial<Answer>) {
        Object.assign(this, answer)
    }
}

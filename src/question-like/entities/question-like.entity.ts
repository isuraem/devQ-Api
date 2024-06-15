import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Question } from 'src/question/entities/question.entity';

@Entity()
export class QuestionLike {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.likes)
    user: User;
  
    @ManyToOne(() => Question, (question) => question.likes)
    question: Question;

    constructor(questionLike: Partial<QuestionLike>) {
        Object.assign(this, questionLike)
    }
}

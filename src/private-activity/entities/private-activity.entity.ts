import { Answer } from "src/answer/entities/answer.entity";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PrivateActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.privateActivities)
  user: User;

  @ManyToOne(() => Question, question => question.privateActivities, { nullable: true })
  question: Question;

  @ManyToOne(() => Answer, answer => answer.privateActivities, { nullable: true })
  answer: Answer;

  @Column({ default: null })
  activityType: string; // 0 -> add answer, 1 -> added like

  @ManyToOne(() => User, user => user.performedActivities)
  performedBy: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  constructor(privateActivity: Partial<PrivateActivity>) {
    Object.assign(this, privateActivity);
  }
}
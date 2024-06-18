import { Company } from 'src/company/entities/company.entity';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class PublicActivity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Company, company => company.publicActivities)
    company: Company;

    @Column('text')
    notificationText: string;

    @ManyToOne(() => User, user => user.publicActivities, { nullable: true })
    user: User;

    @ManyToOne(() => Question, question => question.publicActivities, { nullable: true })
    question: Question;

    @Column({ default: null })
    activityType: string; // 0 -> create question, 1 -> create user

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    constructor(publicActivity: Partial<PublicActivity>) {
        Object.assign(this, publicActivity)
    }
}


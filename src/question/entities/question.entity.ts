import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Answer } from "src/answer/entities/answer.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { QuestionLike } from "src/question-like/entities/question-like.entity";
@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @Column({ default: 0 })
    likecount: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.questions)
    @JoinColumn({
        name: 'user_id'
    })
    user: User

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[]

    @OneToMany(() => QuestionLike, (like) => like.question)
    likes: QuestionLike[];

    @ManyToMany(() => Tag, (tag) => tag.questions, {
        cascade: true
    })
    @JoinTable({
        name: 'question_tags',
        joinColumn: {
            name: 'question_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id'
        }
    })
    tags: Tag[];

    constructor(question: Partial<Question>){
        Object.assign(this, question)
    }  
}

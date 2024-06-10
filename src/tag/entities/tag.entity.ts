import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Question } from "src/question/entities/question.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Question, (question) => question.tags)
    questions: Question[];

    constructor(tag: Partial<Tag>){
        Object.assign(this, tag)
    }  
}
 
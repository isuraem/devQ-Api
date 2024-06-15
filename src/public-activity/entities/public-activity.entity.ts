import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class PublicActivity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyId: number;

    @Column('text')
    notificationText: string;

    @Column({ nullable: true })
    userId: number;

    @Column({ nullable: true })
    questionId: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    constructor(publicActivity: Partial<PublicActivity>) {
        Object.assign(this, publicActivity)
    }
}


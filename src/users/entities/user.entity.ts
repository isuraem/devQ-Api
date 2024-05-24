import { Company } from "src/company/entities/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

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

    constructor(user: Partial<User>){
        Object.assign(this, user)
    }  
}

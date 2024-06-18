import { PublicActivity } from "src/public-activity/entities/public-activity.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToMany(() => User, (user) => user.company)
    users: User[]

    @OneToMany(() => PublicActivity, publicActivity => publicActivity.company)
    publicActivities: PublicActivity[];
    
    constructor(company: Partial<Company>){
        Object.assign(this, company)
    }  
}

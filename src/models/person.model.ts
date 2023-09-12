import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid4} from 'uuid';
import { Dept } from "./dept.model";
import { Build } from "./build.model";


@Entity()
export class Person {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid4();

    @Column()
    name: string

    @Column()
    surname:string

    @Column()
    phone:string

    @Column({nullable: true})
    phone_spare:string

    @Column()
    email:string

    @Column({nullable: true})
    email_spare:string

    @Column({nullable: true})
    car_plate:string

    @Column()
    address:string

    @Column({default: true})
    isActive: boolean

    @Column({default: 'tr'})
    language: string

    @Column({nullable: true})
    education_status: string

    @Column({nullable: true})
    jop: string

    @Column()
    identify_number: string
    
    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Dept, (dept) => dept.person , {cascade: true})
    depts: Dept[];

    @ManyToMany(() => Build, (build) => build.persons)
    builds: Build[];

}
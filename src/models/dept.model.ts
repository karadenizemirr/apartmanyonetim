import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person.model";

@Entity()
export class Dept {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: string;

    @Column()
    price: string

    @Column({default: false})
    isStatus: boolean

    @CreateDateColumn()
    created_at: Date
    
    @ManyToOne(() => Person, (person) => person.depts)
    person: Person;
    
}
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Till } from "./till.model";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type:string

    @Column()
    company:string

    @Column()
    price: string

    @Column({default: false})
    status: boolean

    @Column({type: 'text'})
    description: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => (Till), till => till.expenses, {cascade: true})
    till: Till

}
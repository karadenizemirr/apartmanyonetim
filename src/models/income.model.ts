import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Till } from "./till.model";

@Entity()
export class Income {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    price: string

    @Column({nullable:true})
    note:string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => (Till), till => till.incomes)
    till: Till

}
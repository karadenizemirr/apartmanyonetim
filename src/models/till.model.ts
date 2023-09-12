import { AfterLoad, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Income } from "./income.model";
import { Expense } from "./expense.model";

@Entity()
export class Till {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @Column({nullable:true})
    private _balance:string

    @CreateDateColumn()
    created_at:Date

    @OneToMany(() => (Income), income => income.till)
    incomes: Income[]

    @OneToMany(() => (Expense), expense => expense.till)
    expenses: Expense[]

    get balance(): string{
        let total_income = 0

        if (this.incomes && this.incomes.length > 0){
            for (let income of this.incomes){
                total_income += Number(income.price)
            }
        }
        return total_income.toString()
    }

    set balance(value:string){
        this._balance = value
    }

    @AfterLoad()
    updateBalance(){
        this._balance = this.balance
    }
}
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Expense } from "src/models/expense.model";
import { TillService } from "src/till/till.service";
import { Repository } from "typeorm";

@Injectable()
export class ExpenseService {
    constructor(
        @Inject('EXPENSE_REPOSITORY') private expenseRepository: Repository<Expense>,
        private tillService: TillService
        ) {}

    async create_expense(data:any){
        try{
            const till = await this.tillService.get_till(data.till)

            if (till){
                await this.expenseRepository.save(data)
            }
        }catch(err){
            throw new HttpException('Add expense error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_all(){
        try{
            const expenses = await this.expenseRepository.find(
                {
                    relations: {
                        till: true
                    }
                }
            )

            return expenses
        }catch(err){
            throw new HttpException('Get expenses error', HttpStatus.BAD_GATEWAY)
        }
    }

    async delete_expense(id:number){
        try{
            await this.expenseRepository.delete(id)
        }catch(err){
            throw new HttpException('Delete expense error', HttpStatus.BAD_GATEWAY)
        }
    }

    async edit_expense(id:number, data:any){
        try{
            await this.expenseRepository.update(id, data)
        }catch(err){

            throw new HttpException('Edit expense error', HttpStatus.BAD_GATEWAY)
        }
    }

    async total_expense(){
        try{

            const expenses = await this.expenseRepository.find()

            let total_expense = 0

            for (const expense of expenses){
                total_expense += Number(expense.price)
            }

            return total_expense

        }catch(err){
            throw new HttpException('Total expense error', HttpStatus.BAD_GATEWAY)
        }
    }
    
}
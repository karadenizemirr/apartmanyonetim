import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Income } from "src/models/income.model";
import { TillService } from "src/till/till.service";
import { Repository } from "typeorm";

@Injectable()
export class IncomeService {
    constructor(
        @Inject('INCOME_REPOSITORY') private incomeRepository: Repository<Income>,
        private tillService: TillService
    ) { }

    async add_income(data:any){
        try{
            const till = await this.tillService.get_till(data.till_id)

            if(!till){
                throw new HttpException('Till not found', HttpStatus.NOT_FOUND)
            }

            const result = await this.incomeRepository.save(data)
            return result
        }catch(err){
            throw new HttpException('Add income error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_all(){
        try{
            const result = await this.incomeRepository.find(
                {
                    relations: {
                        till: true
                    }
                }
            )
            return result
        }catch(err){
            throw new HttpException('Get all income error', HttpStatus.BAD_GATEWAY)
        }
    }

    async delete_income(id:number){
        try{
            const result = await this.incomeRepository.delete(id)
            return result
        }catch(err){
            throw new HttpException('Delete income error', HttpStatus.BAD_GATEWAY)
        }
    }

    async edit_income(id:number, data:any){
        try{
            const result = await this.incomeRepository.update(id, data)
            return result
        }catch(err){
            throw new HttpException('Edit income error', HttpStatus.BAD_GATEWAY)
        }
    }

    async total_income(){
        const incomes = await this.incomeRepository.find()
        let total_income = 0

        for (const income of incomes){
            total_income += Number(income.price)
        }

        return total_income
    }
}
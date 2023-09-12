import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Till } from "src/models/till.model";
import { Repository } from "typeorm";

@Injectable()
export class TillService {
    constructor(
        @Inject('TILL_REPOSITORY') private tillRepository: Repository<Till>
    ) {}

    async add_till(data:any){
        try{

            const result = await this.tillRepository.save(data)
            return result

        }catch(err){
            throw new HttpException('Add till error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async get_all(){
        const tills = await this.tillRepository.find(
            {
                relations: {
                    incomes: true
                }
            }
        )
        return tills
    }

    async delete_till(id:number){
        const result = await this.tillRepository.delete(id)
        return result
    }

    async update_till(id:number, data:any){
        const result = await this.tillRepository.update(id, data)
        return result
    }

    async get_till(id:number){
        const till = await this.tillRepository.findOne({
            where:{
                id: id
            },
            relations: {
                incomes: true
            }
        })
        return till
    }
    
}
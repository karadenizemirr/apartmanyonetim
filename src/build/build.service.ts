import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Build } from "src/models/build.model";
import { Repository } from "typeorm";

@Injectable()
export class BuildService {
    constructor(
        @Inject('BUILD_REPOSITORY') private buildRepository: Repository<Build>
    ) {}

    async add_build(data:any){
        try{
            await this.buildRepository.save(data)
        }catch(err){
            throw new HttpException('Add blok and flat error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_all_build(){
        try{
            const result = await this.buildRepository.find()
            return result
        }catch(err){
            throw new HttpException('Get all blok and flat error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_by_id(id:number){
        try{
            const result = await this.buildRepository.findOne(
                {
                    where: {
                        id: id
                    }
                }
            )
            return result
        }catch(err){
            throw new HttpException('Get blok and flat by id error', HttpStatus.BAD_GATEWAY)
        }
    }

    async edit_build(data:any, id:number){
        try{
            const update_data = await this.buildRepository.update(id, data)
            return await this.buildRepository.findOne(
                {
                    where: {
                        id: id
                    }
                }
            )

        }catch(err){
            throw new HttpException('Edit blok and flat error', HttpStatus.BAD_GATEWAY)
        }
    }

    async delete_build(id:number){
        try{
            await this.buildRepository.delete(id)
        }catch(err){
            throw new HttpException('Delete blok and flat error', HttpStatus.BAD_GATEWAY)
        }
    }

    async search_build(name:string){
        try{
            const result = await this.buildRepository.findOne(
                {
                    where: {
                        name: name
                    }
                }
            )
            return result
        }catch(err){
            throw new HttpException('Search blok and flat error', HttpStatus.BAD_GATEWAY)
        }
    }
}
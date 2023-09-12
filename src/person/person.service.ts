import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { BuildService } from "src/build/build.service";
import { Person } from "src/models/person.model";
import { Repository } from "typeorm";

@Injectable()
export class PersonService {
    constructor(
        @Inject('PERSON_REPOSITORY')
        private personRepository: Repository<Person>,
        private buildService: BuildService,
    ) {}

    async add_person(data:any){
        try{

            const result = await this.personRepository.save(data)
            return result

        }catch(err){
            throw new HttpException('Add person error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async get_all_person(){
        try{

            const result = await this.personRepository.find(
                {
                    relations: {
                        depts: true,
                        builds: true
                    }
                }
            )
            return result

        }catch(err){
            throw new HttpException('Get all person error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async add_dept_to_person(id:string, dept:any){
        try{

            const person = await this.personRepository.findOne(
                {
                    where: {
                        id: id
                    }
                }
            )

            person.depts.push(dept)
            await this.personRepository.save(person)

        }catch(err){
            throw new HttpException('Add dept to person error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async get_person(id:string){
        try{

            const result = await this.personRepository.findOne({
                where:{
                    id: id
                },
                relations: {
                    depts: true,
                    builds: true
                }
            })

            return result

        }catch(err){
            throw new HttpException('Get person error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update_detail(id:string, data:any){
        try{

            const result = await this.personRepository.update(id, data)
            return result

        }catch(err){
            throw new HttpException('Update person error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete_person(id:string){
        try{

            const result = await this.personRepository.delete(id)
            return result

        }catch(err){
            throw new HttpException('Delete person error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async person_to_build(id:string, data:any){
        const build_control = await this.buildService.search_build(data.name)
        const person_control = await this.personRepository.findOne(
            {
                where: {
                    id: id
                },
                relations:{
                    builds: true
                }
            }
        )

        if (build_control && person_control){
            const update_build_control = await this.buildService.edit_build(data, build_control.id)
            person_control.builds.push(update_build_control)
            const result = await this.personRepository.save(person_control)
            return result


        }else{
            throw new HttpException('Block not found or user not found', HttpStatus.BAD_GATEWAY)
        }
    }
}
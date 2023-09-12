import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Dept } from "src/models/dept.model";
import { PersonService } from "src/person/person.service";
import { Repository } from "typeorm";

@Injectable()
export class DeptService {
    constructor(
        @Inject('DEPT_REPOSITORY') private deptRepository: Repository<Dept>,
        private personService:PersonService
    ) {}


    async add_dept(data:any){
        const dept = new Dept()
        dept.name = data.name || null
        dept.price = data.price || null
        dept.date = data.date || null

        if (data.person === 'all'){
            // TÜm kullanıcılar borçlandırılacak
            const persons = await this.personService.get_all_person()
            
            for (const person of persons){
                dept.person = person
                await this.deptRepository.save(dept)
                await this.personService.add_dept_to_person(person.id, dept)
            }
        }else{
            // Tek bir kullanıcı borçlandırılacak
            const person = await this.personService.get_person(data.person)
            dept.person = person
            await this.personService.add_dept_to_person(person.id, dept)
        }
    }

    async get_all_dept(){
        try{
            const depts = await this.deptRepository.find(
                {
                    relations:{
                        person:true
                    }
                }
            )

            return depts

        }catch(err){
            console.log(err)
        }
    }

    async get_delete_dept(id:number){
        try{
            await this.deptRepository.delete(id)
            return true

        }catch(err){
            throw new HttpException('Delete dept error', HttpStatus.BAD_REQUEST)
        }
    }

    async edit_dept(id:number, data:any){
        try{

            const edit =  await this.deptRepository.update(id, data)
            return edit

        }catch(err){
            throw new HttpException('Edit dept error', HttpStatus.BAD_REQUEST)
        }
    }

    async edit_dept_by_person(person_id:string, data:any){
        try{

            const dept = await this.deptRepository.findOne(
                {
                    relations: {
                        person: true
                    },
                    where: {
                        id: data.dept_id,
                        person: {
                            id: person_id
                        }
                    }
                }
            )

            if (dept){
                dept.isStatus = data.isStatus
                await this.deptRepository.save(dept)
            }
            

        }catch(err){
            console.log(err)
            throw new HttpException('Edit dept by person error', HttpStatus.BAD_GATEWAY)
        }
    }

    async total_dept(){
        try{
            const depts = await this.deptRepository.find()

            let total_dept = 0

            for (const dept of depts){
                total_dept += Number(dept.price)
            }

            return total_dept

        }catch(err){
            console.log(err)
        }
    }
}
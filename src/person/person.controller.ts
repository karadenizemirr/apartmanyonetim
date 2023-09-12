import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { PersonService } from "./person.service";
import { AuthGuard } from "src/guard/auth.guard";

@Controller('person')
@UseGuards(AuthGuard)
export class PersonController {
    constructor(private personService: PersonService) {}

    @Get()
    @Render('person/index')
    async getPerson(){
        const persons = await this.personService.get_all_person()
        
        return {
            title: 'Kişiler',
            persons: persons
        }
    }

    @Post()
    async addPerson(@Body() body:any, @Res() res:Response){
        const save_result = await this.personService.add_person(body)

        if (save_result){
            res.status(200).send('success')
        }

        res.status(500).send('error')
    }

    @Get('detail/:id')
    @Render('person/detail')
    async get_person_detail(@Param('id') id:string, @Res() res:Response){
        const person = await this.personService.get_person(id)
        const person_build = person?.builds[0]
        const person_depts = person?.depts
        return {
            title: 'Kişi Detay',
            person : person,
            person_build: person_build,
            person_depts: person_depts
        }
    }

    // API 
    @Get('api/getAll')
    async get_all_person(){
        const data = await this.personService.get_all_person()
        return {
            data: data
        }
    }

    // Relation Operations //
    @Post('detail/update/:id')
    async get_detail_update(@Body() data:any, @Param('id') id:string, @Res() res:Response){
        const result = await this.personService.update_detail(id,data)
        res.redirect(302, '/person/detail/'+id)
    }

    @Post('build/:id')
    async build_person_update(@Body() body:any, @Param('id') id:string, @Res() res:Response){
        const result = await this.personService.person_to_build(id, body)
        res.redirect(302, '/person/detail/'+id)
    }

    @Get('delete/:id')
    async delete_person(@Param('id') id:string, @Res() res:Response){
        await this.personService.delete_person(id)
        res.redirect(302, '/person')
    }
}
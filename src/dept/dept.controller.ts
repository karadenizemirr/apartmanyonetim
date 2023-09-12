import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { PersonService } from "src/person/person.service";
import { DeptService } from "./dept.service";
import { Response } from "express";
import { AuthGuard } from "src/guard/auth.guard";

@Controller('dept')
@UseGuards(AuthGuard)
export class DeptController {
    constructor(private personService: PersonService, private deptService: DeptService) { }
    
    @Get()
    @Render('dept/index')
    async get_depth(){
        const persons = await this.personService.get_all_person()
        const depts = await this.deptService.get_all_dept()

        return {
            title: 'Borçlandırma',
            persons: persons,
            depts: depts
        }
    }

    @Post()
    async post_dept(@Body() data:any){
        const result = await this.deptService.add_dept(data)
    }

    @Get('delete/:id')
    async remove_dept(@Param('id') id: number, @Res() res:Response){
        const result = await this.deptService.get_delete_dept(id)

        res.redirect(302, '/dept')
    }

    @Post('edit/:id')
    async post_update_dept(@Param('id') id:number, @Body() data:any, @Res() res:Response){
        const result = await this.deptService.edit_dept(id, data)
        res.redirect(302, '/dept')
        
    }

    @Post('editByPerson/:id')
    async dept_update_to_person(@Body() data:any, @Param('id') id:string, @Res() res:Response){
        const result = await this.deptService.edit_dept_by_person(id, data)
        res.redirect(302, '/person/detail/' + id)

    }


}
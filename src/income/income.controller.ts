import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { TillService } from "src/till/till.service";
import { IncomeService } from "./income.service";
import { AuthGuard } from "src/guard/auth.guard";

@Controller('income')
@UseGuards(AuthGuard)
export class IncomeController {
    constructor(private tillService: TillService, private incomeService: IncomeService) { }

    @Get()
    @Render('income/index')
    async get_income(){
        const tills = await this.tillService.get_all()
        const incomes = await this.incomeService.get_all()

        return {
            title: 'Gelirlerim',
            tills: tills,
            incomes: incomes
        }
    }

    @Post()
    async post_income(@Body() body:any, @Res() res:Response){
        const result = await this.incomeService.add_income(body)

    }

    @Get('delete/:id')
    async get_delete_income(@Param('id') id:number, @Res() res:Response){
        const result = await this.incomeService.delete_income(id)
        res.redirect(302, '/income')
    }

    @Post('edit/:id')
    async post_edit_income(@Param('id') id:number, @Body() body:any, @Res() res:Response){
        const result = await this.incomeService.edit_income(id, body)
        res.redirect(302, '/income')
    }
}
import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { DeptService } from "src/dept/dept.service";
import { TillService } from "src/till/till.service";
import { ExpenseService } from "./expense.service";
import { Response } from "express";
import { AuthGuard } from "src/guard/auth.guard";

@Controller('expense')
@UseGuards(AuthGuard)
export class ExpenseController {
    constructor(private tillService: TillService, private expenseService: ExpenseService) {}

    @Get()
    @Render('expense/index')
    async get_expense(){
        const tills = await this.tillService.get_all()
        const expenses = await this.expenseService.get_all()

        return {
            title: 'Giderler',
            tills: tills,
            expenses: expenses
        }
    }

    @Post()
    async post_expense(@Body() body:any, @Res() res:Response){
        const result = await this.expenseService.create_expense(body)
        res.redirect(302, '/expense')
    }

    @Get('delete/:id')
    async delete_expense(@Res() res:Response, @Param('id') id:number){
        const result = await this.expenseService.delete_expense(id)
        res.redirect(302, '/expense')
    }

    @Post('edit/:id')
    async edit_expense(@Res() res:Response, id:number, @Body() body:any){
        const result = await this.expenseService.edit_expense(id, body)
        res.redirect(302, '/expense')
    }
}
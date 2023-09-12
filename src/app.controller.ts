import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { DeptService } from './dept/dept.service';
import { IncomeService } from './income/income.service';
import { ExpenseService } from './expense/expense.service';
import { TillService } from './till/till.service';
import { AuthGuard } from './guard/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(
    private readonly deptService:DeptService,
    private readonly incomeService: IncomeService,
    private readonly expenseService: ExpenseService,
    private readonly tillService: TillService
    
    ) {}

  @Get()
  @Render('home')
  async getHello() {
    const total_dept = await this.deptService.total_dept()
    const total_income = await this.incomeService.total_income()
    const total_expense = await this.expenseService.total_expense()
    const tills = await this.tillService.get_all()
    return {
      title: 'Anasayfa',
      total_dept: total_dept,
      total_income:total_income,
      total_expense: total_expense,
      tills: tills
    }
  }
}

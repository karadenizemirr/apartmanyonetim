import { Expense } from "src/models/expense.model";
import { DataSource } from "typeorm";

export const expenseProvider = [
    {
        provide: 'EXPENSE_REPOSITORY',
        useFactory: (dataSource:DataSource) => dataSource.getRepository(Expense),
        inject: ['DATA_SOURCE']
    }
]
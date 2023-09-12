import { Income } from "src/models/income.model";
import { DataSource } from "typeorm";

export const incomeProvider = [
    {
        provide: 'INCOME_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Income),
        inject: ['DATA_SOURCE']
    }
]
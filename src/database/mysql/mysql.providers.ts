import { Build } from "src/models/build.model";
import { Dept } from "src/models/dept.model";
import { Expense } from "src/models/expense.model";
import { Income } from "src/models/income.model";
import { Person } from "src/models/person.model";
import { Till } from "src/models/till.model";
import { User } from "src/models/user.model";
import { DataSource } from "typeorm";

export const mysqlProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const datasource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456789',
                database: 'apartmanyonetim',
                entities: [
                    Person,
                    Dept,
                    Till,
                    Income,
                    Expense,
                    Build,
                    User
                ],
                synchronize: true
            })
            return datasource.initialize()
        }
    }
]
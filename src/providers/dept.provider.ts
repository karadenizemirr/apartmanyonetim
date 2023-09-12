import { Dept } from "src/models/dept.model";
import { DataSource } from "typeorm";

export const deptProviders = [
    {
        provide: 'DEPT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Dept),
        inject: ['DATA_SOURCE']
    }
]
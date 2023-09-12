import { Till } from "src/models/till.model";
import { DataSource } from "typeorm";

export const tillProviders = [
    {
        provide: 'TILL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Till),
        inject: ['DATA_SOURCE']
    }
]
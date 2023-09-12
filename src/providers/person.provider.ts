import { Person } from "src/models/person.model";
import { DataSource } from "typeorm";

export const personProviders= [
    {
        provide: 'PERSON_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Person),
        inject: ['DATA_SOURCE']
    }
]
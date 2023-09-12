import { Build } from "src/models/build.model";
import { DataSource } from "typeorm";

export const buildProviders = [
    {
        provide: 'BUILD_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Build),
        inject: ['DATA_SOURCE']
    }
]
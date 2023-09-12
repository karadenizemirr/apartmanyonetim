import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { DeptController } from "./dept.controller";
import { deptProviders } from "src/providers/dept.provider";
import { DeptService } from "./dept.service";
import { PersonService } from "src/person/person.service";
import { personProviders } from "src/providers/person.provider";
import { BuildService } from "src/build/build.service";
import { buildProviders } from "src/providers/build.provider";
import { AuthGuard } from "src/guard/auth.guard";

@Module({
    imports: [DatabaseModule],
    controllers: [DeptController],
    providers: [
        ...deptProviders,
        ...personProviders,
        ...buildProviders,
        DeptService,
        PersonService,
        BuildService,
        AuthGuard
    ],
    exports: [DeptService]
})
export class DeptModule {}
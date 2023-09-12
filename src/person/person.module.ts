import { Module } from "@nestjs/common";
import { PersonController } from "./person.controller";
import { PersonService } from "./person.service";
import { personProviders } from "src/providers/person.provider";
import { DatabaseModule } from "src/database/database.module";
import { BuildService } from "src/build/build.service";
import { buildProviders } from "src/providers/build.provider";
import { deptProviders } from "src/providers/dept.provider";
import { AuthGuard } from "src/guard/auth.guard";

@Module({
    imports: [DatabaseModule],
    controllers: [PersonController],
    providers: [
        ...personProviders,
        ...buildProviders,
        PersonService,
        BuildService,
        AuthGuard
    ],
    exports: [PersonService]
})
export class PersonModule {}
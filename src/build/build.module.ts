import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { BuildController } from "./build.controller";
import { buildProviders } from "src/providers/build.provider";
import { BuildService } from "./build.service";
import { personProviders } from "src/providers/person.provider";
import { AuthGuard } from "src/guard/auth.guard";

@Module({
    imports: [DatabaseModule],
    controllers: [BuildController],
    providers: [
        ...buildProviders,
        BuildService,
        AuthGuard
    ],
})
export class BuildModule {}
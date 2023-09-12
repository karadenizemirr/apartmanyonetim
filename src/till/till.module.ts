import { Module } from "@nestjs/common";
import { TillController } from "./till.controller";
import { TillService } from "./till.service";
import { DatabaseModule } from "src/database/database.module";
import { tillProviders } from "src/providers/till.provider";
import { AuthGuard } from "src/guard/auth.guard";

@Module({
    imports: [DatabaseModule],
    controllers: [TillController],
    providers: [
        ...tillProviders,
        TillService,
        AuthGuard
    ],
    exports: [TillService]
})
export class TillModule {}
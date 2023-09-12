import { Module } from "@nestjs/common";
import { IncomeController } from "./income.controller";
import { IncomeService } from "./income.service";
import { DatabaseModule } from "src/database/database.module";
import { incomeProvider } from "src/providers/income.provider";
import { TillService } from "src/till/till.service";
import { tillProviders } from "src/providers/till.provider";
import { AuthGuard } from "src/guard/auth.guard";

@Module({
    imports: [DatabaseModule],
    controllers: [IncomeController],
    providers: [
        ...incomeProvider,
        ...tillProviders,
        IncomeService,
        TillService,
        AuthGuard

    ],
    exports: [IncomeService]
})
export class IncomeModule {}
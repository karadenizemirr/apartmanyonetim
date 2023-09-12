import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { ExpenseController } from "./expense.controller";
import { expenseProvider } from "src/providers/expense.provider";
import { ExpenseService } from "./expense.service";
import { TillService } from "src/till/till.service";
import { tillProviders } from "src/providers/till.provider";
import { AuthGuard } from "src/guard/auth.guard";

@Module({
    imports: [DatabaseModule],
    controllers: [ExpenseController],
    providers: [
        ...expenseProvider,
        ...tillProviders,
        ExpenseService,
        TillService,
        AuthGuard
        
    ],
    exports: [ExpenseService]
})
export class ExpenseModule {}
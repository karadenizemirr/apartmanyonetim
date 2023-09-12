import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { DeptModule } from './dept/dept.module';
import { TillModule } from './till/till.module';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { BuildModule } from './build/build.module';
import { UserModule } from './user/user.module';
import { JwtService } from './customService/jwt.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoginInterceptors } from './interceptors/login.interceptors';


@Global()
@Module({
  imports: [PersonModule, DeptModule, TillModule, IncomeModule, ExpenseModule, BuildModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoginInterceptors
    }
  ],
  exports: [JwtService]
})
export class AppModule {}

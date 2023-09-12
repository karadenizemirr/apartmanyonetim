import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userProviders } from "src/providers/user.provider";
import { JwtService } from "src/customService/jwt.service";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        ...userProviders,
        UserService
    ]
})
export class UserModule {}
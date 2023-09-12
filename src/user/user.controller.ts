import { Body, Controller, Get, Post, Render, Res, Session, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { UserService } from "./user.service";
import * as secureSession from '@fastify/secure-session'
import { AuthGuard } from "src/guard/auth.guard";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('login')
    @Render('user/login')
    async get_login(@Res() res:Response){
        
        return {
            title: 'Giriş Yap'
        }
    }

    @Post('login')
    async post_login(@Body() data:any, @Res() res:Response, @Session() session:secureSession.Session){
        const login = await this.userService.login(data)

        if (login){
            session.set('token', login)
            res.redirect(302, '/')
        }
    }

    @Post('register')
    @UseGuards(AuthGuard)
    async user_register(@Body() data:any){
        const result = await this.userService.register(data)
        return true
    }

    @Get('logout')
    async logput(@Session() session:secureSession.Session, @Res() res:Response){
        session.delete()
        res.redirect(302, '/user/login')
    }
}
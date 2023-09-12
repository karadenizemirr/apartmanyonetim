import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { BuildService } from "./build.service";
import { Response } from "express";
import { AuthGuard } from "src/guard/auth.guard";

@Controller('build')
@UseGuards(AuthGuard)
export class BuildController {
    constructor(private buildService: BuildService) {}
    

    @Get()
    @Render('build/index')
    async get_build(){
        const builds = await this.buildService.get_all_build()

        return {
            title: 'Blok ve Daire Ayarları',
            builds: builds
        }
    }

    @Post()
    async post_build(@Body() body:any, @Res() res:Response){
        const result = await this.buildService.add_build(body)
        res.redirect(302, '/build')
    }

    @Get('delete/:id')
    async get_delete_build(@Param('id') id:number, @Res() res:Response){
        await this.buildService.delete_build(id)
        res.redirect(302, '/build')
    }

    @Post('edit/:id')
    async post_update_build(@Body() body:any, @Param('id') id:number, @Res() res:Response){
        const result = await this.buildService.edit_build(body, id)
        res.redirect(302, '/build')
    }
}
import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { TillService } from "./till.service";
import { Response } from "express";
import { AuthGuard } from "src/guard/auth.guard";


@Controller('till')
@UseGuards(AuthGuard)
export class TillController {
    constructor(private tillService: TillService) { }
    
    @Get()
    @Render('till/index')
    async get_till(){
        const tills = await this.tillService.get_all()
        return {
            title: 'Kasa',
            tills: tills
        }
    }

    @Post()
    async post_till(@Body() body: any, @Res() res: Response){
        const result = await this.tillService.add_till(body)

        return res.status(200).send(result)
    }

    @Get('delete/:id')
    async delete_till(@Param('id') id:number, @Res() res:Response){
        const result = await this.tillService.delete_till(id)
        res.redirect(302, '/till')
    }

    @Post('edit/:id')
    async edit_till(@Param('id') id:number, @Body() body:any, @Res() res:Response){
        const result = await this.tillService.update_till(id, body)
        res.redirect(302, '/till')
    }
    
}
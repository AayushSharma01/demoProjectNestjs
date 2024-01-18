import { Body, Controller, Get, Param, ParseFloatPipe, ParseIntPipe, Post , Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./user.schma";
import { Response } from "express";

@Controller('auth')
export class AuthController{
   
    constructor(private authService:AuthService){
         
    }

    @Post('signup')
    async signup(
        @Body()
        user
    ):Promise<User>{
         const res = await  this.authService.signup(user)
         return res;
         
    }

    @Post('signin')
    async signin(
        @Body()
        user:User
        ,
        @Res({passthrough:true})
        response:Response  
    ){
       return  await this.authService.signin(user , response) 
        
    }

    @Get('/:id')
    getStringtoInt(@Param('id' , ParseIntPipe) id:number){
        return  typeof id;
        
    }
}
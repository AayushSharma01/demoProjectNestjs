import { Body, Controller, Get, HttpCode, Param, ParseFloatPipe, ParseIntPipe, Post , Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./user.schma";
import { Response } from "express";
import { createUserDto } from "src/dto/create-user.dto";
import { loginUserDto } from "src/dto/login-user.dto";

@Controller('auth')
export class AuthController{
   
    constructor(private authService:AuthService){
         
    }

    @Post('signup')
    async signup(
        @Body()
        user:createUserDto
    ):Promise<User>{
         const res = await  this.authService.signup(user)
         return res;
         
    }

    @Post('signin')
    @HttpCode(204)
    async signin(
        @Body()
        user:loginUserDto
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
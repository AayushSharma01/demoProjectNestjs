import { BadRequestException, Injectable, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schma";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable({})
export class AuthService {
     
    constructor(
        @InjectModel(User.name)
        private userModel : Model<User>,
        private jwtService: JwtService

    ){ }
     

    async signup(user:User): Promise<User> {

        if(user.comfrimePassword !== user.password){
            throw new BadRequestException({error:'password and comfrimepassord are not same'});

        }

        const existingUser = await this.userModel.findOne({email:user.email})

        if(existingUser){
            throw new BadRequestException({error:'existing user, Try with another email'});

        }

        const saltRounds = 10;
        const _password = await bcrypt.hash(user.password , saltRounds);
        user.password = _password;
        const res =  (await this.userModel.create(user)); 
        const result = res.save();
        return result;
        
         

    }

    async signin(user:User , response:Response){
            const res =  await this.userModel.findOne({email:user.email})
        
            if(! res){
                
                throw new BadRequestException({objectOrError:'invalid credentials'}) 
            } 

            if(! await bcrypt.compare(user.password, res.password)){
                console.log(res.password)
                throw new BadRequestException({objectOrError:'invalid credentials'})
           }
           const payload = { id: res._id};
           const jwt = await this.jwtService.signAsync(payload)
          
           response.cookie('jwt' , {httpOnly:true})

           return {message:'signIn done' , 
                  jwt:jwt
             }
        
            

    }

}
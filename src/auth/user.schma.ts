import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

@Schema({timestamps:true})
export class User{
    @Prop({required:true})
    @IsString()
    name: string;

    @Prop()
    @IsEmail()
    email:string;

    @Prop({required:true})
    @IsStrongPassword()
    password:string
    
}

export const UserSchema = SchemaFactory.createForClass(User)


import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

@Schema({timestamps:true})
export class User{
    @Prop({required:true})
    name: string;

   
    @Prop()
    email:string;

    @Prop({required:true})
    password:string

    @Prop({required:true})
    comfrimePassword:string
}

export const UserSchema = SchemaFactory.createForClass(User)


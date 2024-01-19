import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createUserDto{
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    @IsEmail()
    readonly email:string;

    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    readonly comfrimePassword:string;
}
import { IsEmail, IsNegative, IsNotEmpty } from "class-validator";

export class loginUserDto{
    @IsEmail()
    readonly email:string;

    @IsNotEmpty()
    readonly password:string; 
}
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class createBook{
    @IsNotEmpty()
    @IsString()
    readonly title:string
 
    @IsNotEmpty()
    @IsString()
    readonly description:string

    @IsNotEmpty()
    @IsString()
    readonly author:string

    @IsNotEmpty()
    @IsNumber()
    readonly price:number
}
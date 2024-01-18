import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "./book.model";
import { createBook } from "src/dto/create-book.dto";
import {  updateBookDto } from "src/dto/update-book-dto";

@Controller('book')
export class BookController{
    constructor (private bookservice: BookService){}

    @Post('createbook')
    async createBook(
        @Body()
        book:createBook

    ):Promise<Book>{ 
        return this.bookservice.createBook(book);
    }

    @Get('getbooks')
    async getBooks():Promise<Book[]>{
         return this.bookservice.getBooks()
    }

    @Get(':id')
    async getBook(@Param('id') id:string):Promise<Book>{
        console.log(id)
        return this.bookservice.getBook(id)

    }

    @Put(':id')
    async updateBook(@Param('id')id:string,
    @Body()
    book:updateBookDto):Promise<Book>{
       return this.bookservice.updateBook(id , book)
    }

    @Delete(':id')
    async deletBook(@Param('id')id:string):Promise<Book>{
       return this.bookservice.deletBook(id)
    }


}
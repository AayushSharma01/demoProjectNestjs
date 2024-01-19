import { Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {  updateBookDto} from 'src/dto/update-book-dto';
import {Query} from 'express-serve-static-core';
 
@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: Model<Book>
        ){}
    async createBook(book:Book):Promise<Book>{
        const res = await this.bookModel.create(book);
        const result  = await res.save();
        return result;      
    }

    async getBooks(query:Query):Promise<Book[]>{
 
        const resPerPage = 2;
        const currPage = Number(query.page) || 1;
        const skip = resPerPage*(currPage-1);

        const keyword = query?{
            title:{
                $regex: query.title?query.title:"",
                $options:'i'
            },
            author:{
                $regex: query.author?query.author:"",
                $options:'i'
            }
        }:{}
       const res = await this.bookModel.find({...keyword}).limit(resPerPage)
       .skip(skip);
       return res;
    }

    async getBook(id:string):Promise<Book>{
        const res = await this.bookModel.findById(id)
        return res;
    }

    async updateBook(id:string , book:updateBookDto ):Promise<Book>{

        const res = this.bookModel.findByIdAndUpdate(id , book , {
            new:true,
            runValidators:true
        })
        return res
    }

    async deletBook(id:string):Promise<Book>{
        const res = this.bookModel.findByIdAndDelete(id)
        return res
    }

}

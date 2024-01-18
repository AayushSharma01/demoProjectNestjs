import { Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {  updateBookDto} from 'src/dto/update-book-dto';
 
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

    async getBooks():Promise<Book[]>{
       const res = await this.bookModel.find();
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

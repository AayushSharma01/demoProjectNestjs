import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
 


import { MongooseModule } from '@nestjs/mongoose';

import { BookModule } from './book/book.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
 
@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://aayush:aayush123@cluster0.7v126ta.mongodb.net/NestjsLearning'), AuthModule, BookModule],
  controllers:[AppController],
  providers: [AppService],
})
export class AppModule {}

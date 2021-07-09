import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm'

//ENTITIES
import { Book } from '@entities/Book.entity';

//SERVICES
import { SearchService } from '../search/searchService';

@Module({
    imports: [TypeOrmModule.forFeature([Book]), SearchService],
    controllers: [BookController,],
    providers: [BookService, SearchService],
})
export class BookModule { }

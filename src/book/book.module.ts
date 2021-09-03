import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm'

//ENTITIES
import { Book } from '@entities/Book.entity';
import { CustomCategoryUserBook } from '@entities/CustomCategoryUserBook.entity';
import { CustomCategory } from '@entities/CustomCategory.entity';
import { Rating } from '@entities/Rating.entity';
import { UserBook } from '@entities/UserBook.entity';

//SERVICES
import { SearchService } from '../search/searchService';

@Module({
    imports: [TypeOrmModule.forFeature([Book, CustomCategoryUserBook, CustomCategory, Rating, UserBook]), SearchService],
    controllers: [BookController,],
    providers: [BookService, SearchService],
})
export class BookModule { }

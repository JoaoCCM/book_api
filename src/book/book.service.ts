import { Injectable, HttpException } from '@nestjs/common';
import { SearchService } from '../search/searchService';
import { Book } from '@entities/Book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomCategory } from '@entities/CustomCategory.entity';
import { Rating } from '@entities/Rating.entity';
import { UserBook } from '@entities/UserBook.entity';

import { BookDTO } from './dto/book.dto';
@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
        @InjectRepository(CustomCategory) private readonly userListRepository: Repository<CustomCategory>,
        @InjectRepository(Rating) private readonly ratingRepository: Repository<Rating>,
        @InjectRepository(UserBook) private readonly userBookRepository: Repository<UserBook>,
        private readonly searchService: SearchService
    ) { }

    async makeSearch(data) {
        try {
            const { term, type } = data;

            const search = await this.searchService.searchOnBooksApi({ term, type });
            if (!search.success) return [];

            return search;
        } catch (e) {
            throw e;
        }
    }

    async createBook(data: BookDTO) {
        try {
            const { title, publication_date, status, isbn, image, list_id, user_id, rating } = data;

            const userList = await this.userListRepository.findOne({ id: list_id });
            if (!userList) throw new HttpException('List not found', 404);

            let book = await this.bookRepository.findOne({ title });
            if (book) { }

            //BOOK insert
            const saved_book = await this.bookRepository.insert({ title, publication_date, status, isbn, image });

            //RATING insert
            const saved_rating = await this.ratingRepository.insert({ value: rating });

            //UserBook insert
            const saved_user_book = await this.userBookRepository.insert({
                book_id: saved_book.identifiers[0].id, 
                rating_id: saved_rating.identifiers[0].id,
                user_id,
                read_in: null, 
                status: "lendo"
            });

            //To do CustomCategory insert
            return true;
        } catch (e) {
            throw e;
        }
    }

    async findOneBook(id: string) {
        try {
            const search = await this.searchService.findOneBookInfo(id);
            if (!search.success) return {};

            return search;
        } catch (e) {
            throw e;
        }
    }
}

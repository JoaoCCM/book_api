import { Injectable, HttpException, Inject } from '@nestjs/common';
import { SearchService } from '../search/searchService';    
import { Book } from '@entities/Book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
        private readonly searchService: SearchService
    ) { }

    async makeSearch(data) {
        try {
            const { term, type } = data;
            
            const search = await this.searchService.searchOnBooksApi({ term, type });
            if (!search.success) throw new HttpException('Search failed', 500);

            return search;
        } catch (e) {
            throw e;
        }
    }
}

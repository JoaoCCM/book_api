import { Controller, Get, Query, Res, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express';
import { BookService } from './book.service';

@ApiBearerAuth()
@ApiTags('book')
@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService
    ) { }

    @Get('/search')
    async search(@Query() query, @Res() res: Response): Promise<void> {
        try {
            const data = await this.bookService.makeSearch(query);
            res.status(200).json(data);
        } catch (err) {
            const { status, response } = err;
            res.status(status || 500).json(response);
        }
    }

    @Get(':id')
    async findOneBookInfo(@Param('id') id: string, @Res() res: Response): Promise<void> {
        try {
            const data = await this.bookService.findOneBook(id);
            res.status(200).json(data);
        } catch (err) {
            const { status, response } = err;
            res.status(status || 500).json(response);
        }
    }
}

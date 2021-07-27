import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    image: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    isbn: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    status: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    publication_date: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    rating: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    user_id: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    list_id: number;
}
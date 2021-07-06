import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import { Author } from '@entities/Author.entity';
import { Book } from '@entities/Book.entity';

@Entity('author_book')
export class AuthorBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    author_id: number

    @Column({ nullable: false })
    book_id: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date

    @ManyToOne(() => Author, (author) => author.authorBooks)
    @JoinColumn([{ name: "author_id", referencedColumnName: "id" }])
    author: Author;

    @ManyToOne(() => Book, (book) => book.authorBooks)
    @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
    book: Book;
}
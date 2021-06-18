import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { UserBook } from '@entities/UserBook.entity';
import { BookCategory } from '@entities/BookCategory.entity';

@Entity('book')
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    publication_date: Date

    @Column()
    isbn: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => UserBook, (userBook) => userBook.user)
    userBooks: UserBook[];

    @OneToMany(() => BookCategory, (bookCategory) => bookCategory.category)
    bookCategories: BookCategory[];
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { UserBook } from '@entities/UserBook.entity';
import { BookCategory } from '@entities/BookCategory.entity';
import { AuthorBook } from '@entities/AuthorBook.entity';

@Entity('book')
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    title: string

    @Column({ nullable: false })
    publication_date: Date

    @Column({ nullable: true })
    isbn: string

    @Column({ nullable: false, default: 'pendente' })
    status: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => UserBook, (userBook) => userBook.user)
    userBooks: UserBook[];

    @OneToMany(() => BookCategory, (bookCategory) => bookCategory.category)
    bookCategories: BookCategory[];

    @OneToMany(() => AuthorBook, (authorBook) => authorBook.author, { eager: true })
    authorBooks: AuthorBook[];
}
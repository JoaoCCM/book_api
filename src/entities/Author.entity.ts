import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { AuthorBook } from '@entities/AuthorBook.entity'

@Entity('author')
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => AuthorBook, (authorBook) => authorBook.book, { eager: true })
    authorBooks: AuthorBook[];
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Category } from '@entities/Category.entity';
import { Book } from '@entities/Book.entity';

@Entity('book_category')
export class BookCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_id: number

    @Column()
    book_id: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date

    @ManyToOne(() => Category, (category) => category.bookCategories)
    @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
    category: Category;

    @ManyToOne(() => Book, (book) => book.bookCategories)
    @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
    book: Book;
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from '@entities/User.entity';
import { Book } from '@entities/Book.entity';

@Entity('user_book')
export class UserBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number

    @Column()
    book_id: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date

    @ManyToOne(() => User, (user) => user.userBooks)
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;

    @ManyToOne(() => Book, (book) => book.userBooks)
    @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
    book: Book;
}
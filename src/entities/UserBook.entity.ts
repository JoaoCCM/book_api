import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { User } from '@entities/User.entity';
import { Book } from '@entities/Book.entity';
import { Rating } from '@entities/Rating.entity';

@Entity('user_book')
export class UserBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    user_id: number

    @Column({ nullable: false })
    book_id: number

    @Column({ nullable: false })
    rating_id: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date

    @OneToOne(() => Rating, rating => rating.userBook)
    @JoinColumn([{ name: "rating_id", referencedColumnName: "id" }])
    rating: Rating;

    @ManyToOne(() => User, (user) => user.userBooks)
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;

    @ManyToOne(() => Book, (book) => book.userBooks)
    @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
    book: Book;
}
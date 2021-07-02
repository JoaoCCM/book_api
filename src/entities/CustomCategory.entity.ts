import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { UserBook } from '@entities/UserBook.entity';

@Entity('custom_category')
export class CustomCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    user_book_id: number;

    @ManyToOne(() => UserBook, (userBook) => userBook.customCategory)
    @JoinColumn([{ name: "user_book_id", referencedColumnName: "id" }])
    userBook: UserBook;
}
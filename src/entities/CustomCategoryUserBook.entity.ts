import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { CustomCategory } from '@entities/CustomCategory.entity';
import { UserBook } from '@entities/UserBook.entity';

@Entity('custom_category_user_book')
export class CustomCategoryUserBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    custom_category_id: number

    @Column({ nullable: false })
    user_book_id: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date

    @ManyToOne(() => CustomCategory, (customCategory) => customCategory.customCategoryUserBooks)
    @JoinColumn([{ name: "custom_category_id", referencedColumnName: "id" }])
    customCategory: CustomCategory;

    @ManyToOne(() => UserBook, (userBook) => userBook.customCategoryUserBooks)
    @JoinColumn([{ name: "user_book_id", referencedColumnName: "id" }])
    userBook: UserBook;

}
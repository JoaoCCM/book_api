import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { BookCategory } from '@entities/BookCategory.entity';
@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    image: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date

    @OneToMany(() => BookCategory, (bookCategory) => bookCategory.category)
    bookCategories: BookCategory[];
}
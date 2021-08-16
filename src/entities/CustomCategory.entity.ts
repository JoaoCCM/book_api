import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';

import { CustomCategoryUserBook } from '@entities/CustomCategoryUserBook.entity';

@Entity('custom_category')
export class CustomCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @OneToMany(() => CustomCategoryUserBook, (customCategoryUserBook) => customCategoryUserBook.userBook)
    customCategoryUserBooks: CustomCategoryUserBook[];
}
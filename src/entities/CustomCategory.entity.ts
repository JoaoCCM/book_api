import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { CustomCategoryUserBook } from '@entities/CustomCategoryUserBook.entity';
import { User } from '@entities/User.entity';

@Entity('custom_category')
export class CustomCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: false })
    user_id: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.customCategories)
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;

    @OneToMany(() => CustomCategoryUserBook, (customCategoryUserBook) => customCategoryUserBook.userBook)
    customCategoryUserBooks: CustomCategoryUserBook[];
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { UserBook } from '@entities/UserBook.entity';
import { Goal } from '@entities/Goal.entity';
import { CustomCategory } from '@entities/CustomCategory.entity';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'name', nullable: false })
    name: string

    @Column({ name: 'email', nullable: false })
    email: string

    @Column({ name: 'password', nullable: false, select: false })
    password: string

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date

    @OneToMany(() => UserBook, (userBook) => userBook.user, { eager: true })
    userBooks: UserBook[];

    @OneToMany(() => Goal, goal => goal.user, { eager: true })
    goals: Goal[]

    @OneToMany(() => CustomCategory, custom => custom.user, { eager: true })
    customCategories: CustomCategory[]
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { UserBook } from '@entities/UserBook.entity'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'email' })
    email: string

    @Column({ name: 'password' })
    password: string

    @Column({ name: 'age' })
    age: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date

    @OneToMany(() => UserBook, (userBook) => userBook.user, { eager: true })
    userBooks: UserBook[];
}
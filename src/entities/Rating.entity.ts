import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';

import { UserBook } from '@entities/UserBook.entity';

@Entity('rating')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, nullable: false  })
    value: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date

    @OneToOne(() => UserBook, userBook => userBook.rating)
    userBook: UserBook
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from '@entities/User.entity';

@Entity('goal')
export class Goal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    final_goal: number;

    @Column({ nullable: false })
    current_goal: number;

    @Column({ nullable: false })
    time_measure: string;

    @Column({ nullable: false })
    status: string;

    @Column({ nullable: false })
    user_id: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @ManyToOne(() => User, user => user.goals)
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;
}
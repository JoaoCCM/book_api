import { Injectable, HttpException } from '@nestjs/common';
import { Goal } from '@entities/Goal.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGoalDTO } from './dto/goal.dto';


@Injectable()
export class GoalService {
    constructor(
        @InjectRepository(Goal) private readonly goalRepository: Repository<Goal>
    ) { }

    private acceptable_measures = ['ano', 'dia(s)', 'mês']

    async setGoal(data: IGoalDTO) {
        try {
            const { time_measure } = data;

            if (!this.acceptable_measures.includes(time_measure)) throw new HttpException('Invalid option for time measure', 400);

            await this.goalRepository.insert({ ...data, status: 'em andamento' });
            return true;
        } catch (e) {
            throw e;
        }
    }

    async editGoal(id: number, data: IGoalDTO) {
        try {
            const { time_measure } = data;

            if (!this.acceptable_measures.includes(time_measure)) throw new HttpException('Invalid option for time measure', 400);

            await this.goalRepository.update({ id }, data);
            return true;
        } catch (e) {
            throw e;
        }
    }
}

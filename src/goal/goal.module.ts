import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

//ENTITIES
import { Goal } from '@entities/Goal.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Goal])],
    controllers: [GoalController],
    providers: [GoalService],
})
export class GoalModule { }

import { Controller, Post, ValidationPipe, Body, Res, Req, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express';
import { IGoalDTO } from './dto/goal.dto';
import { GoalService } from './goal.service';
import { IAuthMiddleware } from '../middlewares/IAuthMiddleware';

@ApiBearerAuth()
@ApiTags('goal')
@Controller('goal')
export class GoalController {
    constructor(private readonly goalService: GoalService) { }

    @Post()
    async setUserGoal(@Body(new ValidationPipe) goalDTO: IGoalDTO, @Req() req, @Res() res: Response): Promise<void> {
        try {
            const { id: user_id } = req.user.payload;
            const data = await this.goalService.setGoal({ ...goalDTO, user_id });
            res.status(200).json({ "Created": data })
        } catch (err) {
            const { status, response } = err;
            res.status(status || 500).json(response);
        }
    }

    @Put('/:id')
    async editGoal(@Param('id') id: number, @Body(new ValidationPipe) goalDTO: IGoalDTO, @Res() res: Response): Promise<void> {
        try {            
            const data = await this.goalService.editGoal(id, goalDTO);
            res.status(200).json({ "Updated": data })
        } catch (err) {
            const { status, response } = err;
            res.status(status || 500).json(response);
        }
    }
}

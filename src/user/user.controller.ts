import { Controller, Body, Post, ValidationPipe, Res } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body(new ValidationPipe) userDTO: UserDTO, @Res() res: Response): Promise<void> {
        try {
            const user = await this.userService.createUser(userDTO);
            res.status(200).json(user);
        } catch (e) {
            const { status, response } = e;
            res.status(status || 500).json(response);
        }
    }
}

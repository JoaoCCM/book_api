import { Controller, ValidationPipe, Body, Res, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('signin')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(@Body(new ValidationPipe) authDTO: AuthDTO, @Res() res: Response): Promise<void> {
        try {
            const data = await this.authService.login(authDTO);
            res.status(200).json(data);
        } catch (err) {
            const { status, response } = err;
            res.status(status || 500).json(response);
        }
    }
}

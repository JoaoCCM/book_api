import { Controller, Post, Put, Delete, ValidationPipe, Body, Param, Res } from '@nestjs/common';
import { UserListService } from './userlist.service';
import { UserListDTO } from './dto/userList.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('user list')
@Controller()
export class UserlistController {
    constructor(
        private readonly userListService: UserListService,
    ) { }

    @Post('/user/list')
    async createNewList(@Body(new ValidationPipe) userListDTO: UserListDTO, @Res() res: Response): Promise<void> {
        try {
            const data = await this.userListService.createNewUserList(userListDTO);
            res.status(200).json({ 'Created': data });
        } catch (err) {
            const { status, response } = err;
            res.status(status || 500).json(response);
        }
    }

    @Put('/user/list/edit/:id')
    async editList(@Param('id') id: number, @Body(new ValidationPipe) userListDTO: UserListDTO, @Res() res: Response): Promise<void> {
        try {
            const data = await this.userListService.editUserList(id, userListDTO);
            res.status(200).json({ 'Updated': data });
        } catch (err) {
            const { status, response } = err;
            res.status(status || 500).json(response);
        }
    }

    @Delete('/user/list/remove/:id')
    async removeList(@Param('id') id: number, @Res() res: Response): Promise<void> {
        try {
            const data = await this.userListService.removeUserList(id);
            res.status(200).json({ 'Deleted': data });
        } catch (err) {
            const { status, response } = err;
            res.status(status || 500).json(response);
        }
    }
}

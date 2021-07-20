import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomCategory } from '@entities/CustomCategory.entity';
import { UserListDTO } from './dto/userList.dto';

@Injectable()
export class UserListService {
    constructor(
        @InjectRepository(CustomCategory) private readonly customCategoryRepository: Repository<CustomCategory>
    ) { }

    async createNewUserList(data: UserListDTO) {
        try {
            await this.customCategoryRepository.insert(data);
            return true;
        } catch (e) {
            throw e;
        }
    }

    async editUserList(id: number, data: UserListDTO) {
        try {
            const edit = await this.customCategoryRepository.update({ id }, data);
            if (!edit) throw new HttpException('List not found', 404);
            return true;
        } catch (e) {
            throw e;
        }
    }

    async removeUserList(id: number) {
        try {
            const removed = await this.customCategoryRepository.delete({ id });
            if (!removed) throw new HttpException('List not found', 404);
            return true;
        } catch (e) {
            throw e;
        }
    }
}

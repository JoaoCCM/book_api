import { UserlistController } from './userlist.controller';
import { Module } from '@nestjs/common';
import { UserListService } from './userlist.service';
import { TypeOrmModule } from '@nestjs/typeorm'

//ENTITIES
import { CustomCategory } from '@entities/CustomCategory.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CustomCategory])],
    controllers: [UserlistController,],
    providers: [UserListService],
})
export class UserListModule { }

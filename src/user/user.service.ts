import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { User } from '@entities/User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async createUser(user: UserDTO) {
        try {
            const { password } = user;
            const hashed_pass = hashSync(password, parseInt(process.env.SALT_ROUNDS))

            await this.userRepository.insert({ ...user, password: hashed_pass });
            return { success: true };
        } catch (e) {
            throw e;
        }
    }
}

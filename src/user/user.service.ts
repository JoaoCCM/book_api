import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { User } from '@entities/User.entity';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async findOnePassword(email: string) {
        try {
            const user = await getConnection()
                .createQueryBuilder(User, 'user')
                .addSelect('user.password')
                .where('user.email = :email', { email })
                .getOne();

            return user;
        } catch (err) {
            throw err;
        }
    }

    async findUser(where = {}, relations = []) {
        return await this.userRepository.findOne({ where, relations })
    }

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

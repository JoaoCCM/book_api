import { Injectable, HttpException } from '@nestjs/common';
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

    async userDashboardData(id: number) {
        try {
            const user = await this.findUser({ id });
            if (!user) throw new HttpException('User not found', 404);

            const active_goal = user.goals.find(it => it.status === 'em andamento');
            const user_data = { id: user.id, name: user.name, user_books: user.userBooks, active_goal }

            return user_data;
        } catch (e) {
            throw e;
        }
    }
}

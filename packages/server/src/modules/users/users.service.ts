import { HttpException, Injectable } from '@nestjs/common';
import { isAlreadyExistsError } from '~/prisma/utils';
import { CreateUserDto } from './dto';
import { generateHash } from '~/utils';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(dto: CreateUserDto) {
    try {
      const hashedPassword = await generateHash(dto.password);
      const user = await this.usersRepository.createUser({
        email: dto.email,
        password: hashedPassword,
      });

      return user;
    } catch (err) {
      if (isAlreadyExistsError) {
        throw new HttpException('User already exists', 400);
      }
    }
  }

  // TODO: null로 할 지 error로 할 지 고민
  async getCurrentUser(user: User) {
    if (!user) return { user: null };
    return {
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}

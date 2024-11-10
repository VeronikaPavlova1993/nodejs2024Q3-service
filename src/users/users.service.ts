import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, User } from 'types';
import * as uuid from 'uuid';
import { UserModel } from './user.model';
import { UpdateUserDb } from './db/updateUser';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async getAllUsers() {
    return this.users;
  }

  createUser({ login, password }: CreateUserDto): User {
    const newUser = new UserModel({
      id: uuid.v4(),
      login,
      password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.users.push(newUser);
    return newUser;
  }

  getOneUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    return user;
  }
  updateUser(id: string, { oldPassword, newPassword }: UpdateUserDb) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Wrong password`);
    }
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = new Date().getTime();
    return user;
  }
  removeUser(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    this.users.splice(userIndex, 1);
    return {};
  }
}

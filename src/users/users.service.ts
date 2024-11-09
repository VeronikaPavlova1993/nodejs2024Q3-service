import { Injectable } from "@nestjs/common";
import { CreateUserDto, User } from "types";
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 'id',
      login: 'login',
      password: 'password',
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
  async getAllUsers() {
    return this.users;
  }
  async createUser(user: CreateUserDto) {
    const newUser = {
      id: uuid.v4(),
      ...user,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }
}
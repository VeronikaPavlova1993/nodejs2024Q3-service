import { Exclude } from "class-transformer";

export class UserModel {
  id: string; 
  login: string;
  @Exclude()
  password: string;
  version: number; 
  createdAt: number;
  updatedAt: number;
  constructor(user: UserModel) {
    Object.assign(this, user);
  }
}
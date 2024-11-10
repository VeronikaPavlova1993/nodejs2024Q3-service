import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDb {
    @IsNotEmpty()
    @IsString()
    oldPassword: string;
    @IsNotEmpty()
    @IsString()
    newPassword: string; 
  }
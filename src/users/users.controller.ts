import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'types';
import { UpdateUserDb } from './db/updateUser';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get(':id')
  getOneUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getOneUser(id);
  }
  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDb,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.removeUser(id);
  }
}

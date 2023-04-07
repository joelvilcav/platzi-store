import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List of Users' })
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOneUser(userId);
  }

  @Get(':userId/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrdersByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOrdersByUser(userId);
  }

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.createUser(payload);
  }

  @Put(':userId')
  updateUser(@Param('userId') userId: string, @Body() payload: UpdateUserDto) {
    return this.userService.updateUser(+userId, payload);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(+userId);
  }
}

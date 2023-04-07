import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/users/entities/order.entity';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private counterId = 1;

  private users: User[] = [
    {
      id: 1,
      name: 'User 1',
      age: 24,
      email: 'email@email.com',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const db_name = this.configService.get('DATABASE_NAME');
    console.log(apiKey, db_name);
    return this.users;
  }

  findOneUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ${id} was not found`);
    }
    return user;
  }

  createUser(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, payload: UpdateUserDto) {
    const user = this.findOneUser(id);
    if (user) {
      const index = this.users.findIndex((user) => user.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id:${id} was not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrdersByUser(id: number): Order {
    const user = this.findOneUser(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}

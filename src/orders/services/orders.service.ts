import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@Injectable()
export class OrdersService {
  private counterId = 1;
  private orders: Order[] = [
    {
      id: 1,
      totalPrice: 100,
      dateCreate: '2023-01-01',
      isDelivered: true,
    },
  ];

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new NotFoundException(`Order with ${id} was not found`);
    }
    return order;
  }

  create(payload: CreateOrderDto) {
    this.counterId = this.counterId + 1;
    const newOrder = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  update(id: number, payload: UpdateOrderDto) {
    const order = this.findOne(id);
    if (order) {
      const index = this.orders.findIndex((order) => order.id === id);
      this.orders[index] = {
        ...order,
        ...payload,
      };
      return this.orders[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index === -1) {
      throw new NotFoundException(`Order with ${id} was not found`);
    }
    this.orders.splice(index, 1);
    return true;
  }
}

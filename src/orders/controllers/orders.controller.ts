import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';

import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  getOrders() {
    return this.orderService.findAll();
  }

  @Get(':orderId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrderById(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.findOne(orderId);
  }

  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':orderId')
  updateOrder(
    @Param('orderId') orderId: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(+orderId, payload);
  }

  @Delete(':orderId')
  deleteOrder(@Param('orderId') orderId: string) {
    return this.orderService.delete(+orderId);
  }
}

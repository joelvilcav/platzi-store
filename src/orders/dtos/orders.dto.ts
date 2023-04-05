import { IsNotEmpty, IsPositive, IsBoolean, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsPositive()
  readonly totalPrice: number;

  @IsNotEmpty()
  @IsString()
  readonly dateCreate: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isDelivered: boolean;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

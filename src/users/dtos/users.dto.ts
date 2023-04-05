import {
  IsString,
  IsNumber,
  IsPositive,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly age: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

import { Module } from '@nestjs/common';

import { ProductsController } from './contollers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

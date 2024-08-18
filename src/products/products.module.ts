import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsService } from '../brands/services/brands.service';
import { Brand } from '../brands/entities/brand.entity';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand])],
  controllers: [ProductsController],
  // TODO: para los servicios con con providers
  providers: [ProductsService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './controllers/order.controller';
import { OrdersService } from './services/order.service';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { OrderItemService } from './services/order-item.service';
import { OrderItemController } from './controllers/order-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, Customer])],
  controllers: [OrdersController, OrderItemController],
  providers: [OrdersService, OrderItemService],
})
export class OrderModule {}

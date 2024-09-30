import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../../products/entities/product.entity';

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/oders-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);
    const item = new OrderItem();

    item.order = order;
    item.product = product;
    item.quantity = data.quantity;

    return this.itemRepo.save(item);
  }

  async update(id: number, data: UpdateOrderItemDto) {
    const orderItem = await this.itemRepo.findOne(id);

    if (!orderItem) {
      throw new Error('Order item not found');
    }

    if (data.orderId) {
      const order = await this.orderRepo.findOne(data.orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      orderItem.order = order;
    }

    if (data.productId) {
      const product = await this.productRepo.findOne(data.productId);
      if (!product) {
        throw new Error('Product not found');
      }
      orderItem.product = product;
    }

    if (data.quantity) {
      orderItem.quantity = data.quantity;
    }

    return this.itemRepo.save(orderItem);
  }

  async delete(id: number) {
    const orderItem = await this.itemRepo.findOne({ where: { id } });

    if (!orderItem) {
      throw new Error('Order item not found');
    }

    return this.itemRepo.remove(orderItem);
  }
}

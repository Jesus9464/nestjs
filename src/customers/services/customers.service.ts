import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customersRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customersRepo.find();
  }

  findOne(id: number) {
    const product = this.customersRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateCustomerDto) {
    const newProduct = this.customersRepo.create(data);

    return this.customersRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const product = await this.customersRepo.findOne(id);

    this.customersRepo.merge(product, changes);

    return this.customersRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.customersRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return this.customersRepo.remove(product);
  }
}

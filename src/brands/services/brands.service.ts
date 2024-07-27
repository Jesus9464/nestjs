import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  findOne(id: number) {
    const product = this.brandRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newProduct = this.brandRepo.create(data);

    return this.brandRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const product = await this.brandRepo.findOne(id);

    this.brandRepo.merge(product, changes);

    return this.brandRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.brandRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return this.brandRepo.remove(product);
  }
}

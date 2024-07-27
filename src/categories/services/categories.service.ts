import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    const product = this.categoryRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateCategoryDto) {
    const newProduct = this.categoryRepo.create(data);

    return this.categoryRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const product = await this.categoryRepo.findOne(id);

    this.categoryRepo.merge(product, changes);

    return this.categoryRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.categoryRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return this.categoryRepo.remove(product);
  }
}

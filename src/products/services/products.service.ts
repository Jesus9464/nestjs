import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import {
  CreateProductsDto,
  FilterProductsDto,
  updateProductsDto,
} from '../dtos/products.dto';

import { Category } from '../../categories/entities/category.entity';

import { Brand } from '../../brands/entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  finAll(params?: FilterProductsDto) {
    if (params) {
      const { limit, offset } = params;
      return this.productRepo.find({
        relations: ['brand'],
        take: limit,
        skip: offset,
      });
    }

    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductsDto) {
    // TODO: se puede hacer de estas dos formas:
    // const newProduct = new Product();
    // newProduct.image = payload.image;
    // newProduct.name = payload.name;
    // newProduct.description = payload.description;
    // newProduct.price = payload.price;
    // newProduct.stock = payload.stock;

    const newProduct = this.productRepo.create(payload);

    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(payload.brandId);
      newProduct.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: updateProductsDto) {
    const product = await this.productRepo.findOne(id);

    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(payload.brandId);
      product.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      product.categories = categories;
    }

    this.productRepo.merge(product, payload);

    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });

    if (product) {
      product.categories = product.categories.filter(
        (category) => category.id !== categoryId,
      );
    }

    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });

    if (product) {
      const category = await this.categoryRepo.findOne(categoryId);
      product.categories.push(category);
    }

    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return this.productRepo.remove(product);
  }
}

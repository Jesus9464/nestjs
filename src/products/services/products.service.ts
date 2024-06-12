import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
// import { CreateProductsDto, updateProductsDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  finAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // create(payload: CreateProductsDto) {
  //   console.log(payload);
  //   this.counterId = this.counterId + 1;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: number, payload: updateProductsDto) {
  //   const productFound = this.findOne(id);
  //   if (productFound) {
  //     const index = this.products.findIndex((item) => item.id === id);

  //     this.products[index] = { ...productFound, ...payload };

  //     return this.products[index];
  //   } else {
  //     return 'Product not found';
  //   }
  // }

  // delete(id: number) {
  //   const productFound = this.findOne(id);
  //   if (!productFound) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   } else {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products.splice(index, 1);
  //     return { message: 'product deleted' };
  //   }
  // }
}

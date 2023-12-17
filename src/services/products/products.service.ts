import { Injectable } from '@nestjs/common';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      description: 'esta es la descripccion',
      price: 12000,
      stock: 12,
      image: 'holaa',
    },
  ];

  finAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const productFound = this.findOne(id);
    if (productFound) {
      const index = this.products.findIndex((item) => item.id === id);

      this.products[index] = { ...productFound, ...payload };

      return this.products[index];
    } else {
      return 'Product not found';
    }
  }

  delete(id: number) {
    const productFound = this.findOne(id);
    if (productFound) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products.splice(index, 1);
      return 'product deleted';
    } else {
      return 'product not found';
    }
  }
}

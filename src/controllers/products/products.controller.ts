import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from '../../services/products/products.service';

//TODO: para enviar un status code personalizado es con @HttpCode(HttpStatus.ACCEPTED)

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  products() {
    return this.productsService.finAll();
  }

  @Get(':productId')
  product(@Param('productId') productId: string) {
    return this.productsService.findOne(+productId);
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':productId')
  update(@Param('productId') productId: string, @Body() payload: any) {
    return this.productsService.update(+productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId') productId: string) {
    return this.productsService.delete(+productId);
  }
}

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
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductsDto, updateProductsDto } from '../../dtos/products.dto';

//TODO: para enviar un status code personalizado es con @HttpCode(HttpStatus.ACCEPTED)

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  products() {
    return this.productsService.finAll();
  }

  @Get(':productId')
  product(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductsDto) {
    return this.productsService.create(payload);
  }

  //TODO: para un campo es un patch y muchos son put el put devuelve una respuesta el patch no devuelve nada
  @Put(':productId')
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: updateProductsDto,
  ) {
    return this.productsService.update(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.delete(productId);
  }
}

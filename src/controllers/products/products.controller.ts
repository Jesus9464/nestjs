import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  products() {
    return { message: `hola soy products` };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'esto crea un product con los siguientes datos',
      body: payload,
    };
  }

  @Delete(':productId')
  delete(@Param('productId') productId: string) {
    return {
      message: `se elimino el producto con el id ${productId}`,
    };
  }
}

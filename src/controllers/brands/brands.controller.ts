import { Controller, Get } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  brands() {
    return { message: 'Hola soy brands' };
  }
}

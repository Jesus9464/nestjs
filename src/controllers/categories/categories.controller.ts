import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  category() {
    return { message: `hola soy categorias` };
  }
}

import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrderController {
  @Get()
  orders() {
    return { message: `hola soy orders` };
  }
}

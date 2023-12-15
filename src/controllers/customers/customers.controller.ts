import { Controller, Get } from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  @Get()
  customers() {
    return { message: `hola soy customers` };
  }
}

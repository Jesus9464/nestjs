import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  users() {
    return {
      message: `hola soy mensaje`,
    };
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola Jesus';
  }

  //podemos crear rutas con slash "/" o sin slash ya que nest intuye qe es una ruta a excepcion de express
  //sin slash
  @Get('nuevo')
  newEndpoint(): string {
    return 'yo soy nuevo en estas cosas';
  }

  //con slash
  @Get('/ruta')
  newRute(): string {
    return 'soy una ruta con slash';
  }
}

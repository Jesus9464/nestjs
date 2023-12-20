import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PORT } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //TODO: significa que automaticamnete el va a quitar del payload los atributos que no estan en el dto
      whitelist: true,
      //TODO: significa que va a colocar el problema al request le dice que el atributo no es valido
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(PORT);
}
bootstrap();

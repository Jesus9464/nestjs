import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  //document api with openAPI
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Platzi version')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();

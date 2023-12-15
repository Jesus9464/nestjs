import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/config';

async function bootstrap() {
  console.log('run app:', `http://localhost:${PORT}/`);

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();

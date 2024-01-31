import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({
  controllers: [CategoriesController],
  // TODO: para los servicios con con providers
  providers: [CategoriesService],
})
export class CategoriesModule {}

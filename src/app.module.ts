import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { API_KEY } from './common/constans';

@Module({
  imports: [
    BrandsModule,
    CustomersModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
})
export class AppModule {}

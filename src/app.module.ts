import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    BrandsModule,
    CustomersModule,
    OrdersModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

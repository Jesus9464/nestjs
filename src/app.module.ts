import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroment } from './common/config';
import config from './common/config/types';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    BrandsModule,
    CustomersModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASK',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const task = await lastValueFrom(request);
        return task.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}

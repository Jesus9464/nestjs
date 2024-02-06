import { Module, Global } from '@nestjs/common';
import { API_KEY } from 'src/common/constans';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}

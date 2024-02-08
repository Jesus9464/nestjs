import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './common/config/types';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASK')
    private task: any[],
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dataBaseName = this.configService.database.name;
    return `Hello World! ${apiKey}, ${dataBaseName}`;
  }
}

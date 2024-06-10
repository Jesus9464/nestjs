import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './common/config/types';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASK') private task: any[],
    @Inject('PG') private clientPg: Client,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dataBaseName = this.configService.database.name;
    return `Hello World! ${apiKey}, ${dataBaseName}`;
  }

  getTask() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result.rows);
      });
    });
  }
}

import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apikey: string,
    @Inject('TASK') private task: any[],
  ) {}
  getHello(): string {
    console.log('task', this.task);
    return `Hello World! ${this.apikey}`;
  }
}

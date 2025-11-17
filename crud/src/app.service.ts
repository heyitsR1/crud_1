import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log (process.env.DATABASE_PASSWORD)
    return 'Students Portal';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  processOrder(): any {
    return {
      order_id: '1234567890',
    };
  }
}

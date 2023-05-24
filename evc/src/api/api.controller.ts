import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api')
export class ApiController {
  constructor(@Inject('API_SERVICE') private apiService: ClientProxy) {}

  @Post('order')
  async submitOrder() {
    return this.apiService.emit('submit_order', { message: 'Hello world' });
  }
}

import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api')
export class ApiController {
  constructor(@Inject('QUEUE_SERVICE') private queueService: ClientProxy) {}

  @Post('order')
  async submitOrder() {
    return this.queueService.send(
      { cmd: 'submit_order' },
      { message: 'Hello world' },
    );
  }
}

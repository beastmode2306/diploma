import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'submit_order' })
  getHello(@Payload() data: any, @Ctx() context: RmqContext): string {
    console.log('Received message:', data);
    return this.appService.processOrder();
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SubmitRequestDto } from './dtos/submitRequest.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'submit_order' })
  async submitOrder(
    @Payload() data: SubmitRequestDto,
    @Ctx() context: RmqContext,
  ): Promise<SubmitRequestDto> {
    console.log('submit_order');
    const points = await this.appService.processOrder(data.points);

    return {
      points,
      orderDetailId: data.orderDetailId,
    };
  }
}

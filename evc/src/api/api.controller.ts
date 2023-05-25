import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SubmitRequestDto } from './dtos/submitRequest.dto';
import { ApiService } from './api.service';
import { ApiKeyGuard } from '../key/guards/apiKey.guard';
import { CompanyId } from '../common/company.decorator';

@Controller('api')
export class ApiController {
  constructor(
    @Inject('QUEUE_SERVICE') private queueService: ClientProxy,
    private apiService: ApiService,
  ) {}

  @UseGuards(ApiKeyGuard)
  @Post('order')
  async submitOrder(
    @Body() data: SubmitRequestDto,
    @CompanyId() companyId: number,
  ) {
    const { orderDetail, order } = await this.apiService.createOrder(
      data,
      companyId,
    );

    this.queueService
      .send({ cmd: 'submit_order' }, { ...data, orderDetailId: orderDetail.id })
      .subscribe(this.apiService.handleOrderReceived.bind(this.apiService));

    return order;
  }

  @UseGuards(ApiKeyGuard)
  @Get('order')
  async getOrders(@CompanyId() companyId: number) {
    return this.apiService.getOrders(companyId);
  }

  @UseGuards(ApiKeyGuard)
  @Get('order/:id')
  async getOrder(
    @CompanyId() companyId: number,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return this.apiService.getOrder(companyId, orderId);
  }
}

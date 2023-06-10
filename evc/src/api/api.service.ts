import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitRequestDto } from './dtos/submitRequest.dto';
import { Order, OrderDetails, OrderStatus } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ApiService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  async getOrders(companyId: number) {
    return this.prisma.order.findMany({
      where: {
        companyId,
      },
      include: {
        details: true,
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getOrder(companyId: number, orderId: number) {
    return this.prisma.order.findFirst({
      where: {
        id: orderId,
        companyId,
      },
      include: {
        details: true,
        company: true,
      },
    });
  }

  async createOrder(
    dto: SubmitRequestDto,
    companyId: number,
  ): Promise<{ order: Order; orderDetail: OrderDetails }> {
    if (dto.points.length < 2 || dto.points.length > 10) {
      throw new BadRequestException('Invalid number of points');
    }
    const order = (await this.prisma.order.create({
      data: {
        companyId,
      },
    })) as Order;

    const orderDetail = (await this.prisma.orderDetails.create({
      data: {
        orderId: order.id,
        points: JSON.stringify(dto.points),
      },
    })) as OrderDetails;

    return { order, orderDetail };
  }

  async handleOrderReceived(
    data: SubmitRequestDto & { orderDetailId: number },
  ) {
    const orderDetails = await this.prisma.orderDetails.update({
      where: {
        id: data.orderDetailId,
      },
      data: {
        result: JSON.stringify(data.points),
      },
    });

    let order = await this.prisma.order.findUnique({
      where: {
        id: orderDetails.orderId,
      },
      include: {
        details: true,
        company: true,
      },
    });

    if (order.details.every((d) => d.result !== '{}')) {
      order = await this.prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: OrderStatus.COMPLETED,
        },
        include: {
          details: true,
          company: true,
        },
      });

      await this.notificationService.sendEmail({
        to: order.company.email,
        type: 'order',
        data: {
          order_link: `${process.env.FRONTEND_URL}/order/${order.id}`,
        },
      });
    }
  }
}

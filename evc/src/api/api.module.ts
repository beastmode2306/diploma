import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { ApiController } from './api.controller';
import { ConfigService } from '@nestjs/config';
import { ApiService } from './api.service';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [
    {
      provide: 'QUEUE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBIT_USER');
        const password = configService.get('RABBIT_PASSWORD');
        const host = configService.get('RABBIT_HOST');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: 'mainQueue',
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    ApiService,
  ],
})
export class ApiModule {}

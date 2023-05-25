import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiController } from './api.controller';
import { ConfigService } from '@nestjs/config';
import { ApiService } from './api.service';
import { NotificationModule } from '../notification/notification.module';
import { KeyModule } from '../key/key.module';

@Module({
  imports: [NotificationModule, KeyModule],
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
  exports: [ApiService],
})
export class ApiModule {}

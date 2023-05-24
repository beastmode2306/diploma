import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const user = process.env.RABBIT_USER || 'guest';
  const password = process.env.RABBIT_PASSWORD || 'guest';
  const host = process.env.RABBIT_HOST || 'rabbitmq';

  console.log(`Connecting to RabbitMQ at ${host} as ${user}`);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        queue: 'mainQueue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();

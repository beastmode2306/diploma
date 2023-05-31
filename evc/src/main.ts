import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

import { TransformationInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformationInterceptor());
  app.enableCors();

  await app.listen(configService.get('PORT'), () => {
    console.log(`Listening on port ${configService.get('PORT')}`);
  });
}
bootstrap();

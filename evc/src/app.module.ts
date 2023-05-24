import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { KeyModule } from './key/key.module';

import configuration from '../config/configuration';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ApiModule,
    KeyModule,
    PrismaModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

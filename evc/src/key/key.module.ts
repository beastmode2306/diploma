import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { KeyController } from './key.controller';
import { CompanyModule } from '../company/company.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [CompanyModule, NotificationModule],
  controllers: [KeyController],
  providers: [KeyService],
})
export class KeyModule {}

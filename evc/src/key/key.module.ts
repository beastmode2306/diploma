import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { KeyController } from './key.controller';
import { CompanyModule } from '../company/company.module';
import { NotificationModule } from '../notification/notification.module';
import { ApiKeyGuard } from './guards/apiKey.guard';

@Module({
  imports: [CompanyModule, NotificationModule],
  controllers: [KeyController],
  providers: [KeyService, ApiKeyGuard],
  exports: [KeyService, ApiKeyGuard],
})
export class KeyModule {}

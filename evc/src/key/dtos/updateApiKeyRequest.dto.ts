import { ApiKeyRequestStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateApiKeyRequestDto {
  @IsEnum(ApiKeyRequestStatus)
  status: ApiKeyRequestStatus;
}

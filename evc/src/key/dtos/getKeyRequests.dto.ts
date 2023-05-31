import { IsEnum, IsOptional } from 'class-validator';
import { ApiKeyRequestStatus } from '@prisma/client';

export class GetKeyRequestsDto {
  @IsEnum(ApiKeyRequestStatus)
  @IsOptional()
  status?: ApiKeyRequestStatus;
}

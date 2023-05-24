import { IsInt, IsNotEmpty, IsString } from 'class-validator';

import { Company } from '@prisma/client';

export class CreateApiKeyDto {
  companyId: number;

  @IsString()
  @IsNotEmpty()
  key: string;
}

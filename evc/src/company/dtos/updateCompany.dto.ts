import {
  IsEmail,
  IsEnum,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { CompanyStatus } from '@prisma/client';

export class UpdateCompanyDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsISO31661Alpha2()
  @IsOptional()
  country?: string;

  @IsEnum(CompanyStatus)
  @IsOptional()
  status?: CompanyStatus;
}

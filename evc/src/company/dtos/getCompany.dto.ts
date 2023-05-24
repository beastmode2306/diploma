import { IsEmail, IsOptional, IsPositive } from 'class-validator';

export class GetCompanyDto {
  @IsPositive()
  @IsOptional()
  id?: number;

  @IsEmail()
  @IsOptional()
  email?: string;
}

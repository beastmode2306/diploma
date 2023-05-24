import {
  IsEmail,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCompanyDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsISO31661Alpha2()
  country: string;
}

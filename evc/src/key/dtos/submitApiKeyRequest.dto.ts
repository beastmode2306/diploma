import {
  IsEmail,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SubmitApiKeyRequestDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsEmail()
  companyEmail: string;

  @IsISO31661Alpha2()
  companyCountry: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

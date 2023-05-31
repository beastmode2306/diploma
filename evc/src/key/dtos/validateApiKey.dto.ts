import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateApiKeyDto {
  @IsString()
  @IsNotEmpty()
  key: string;
}

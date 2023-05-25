import {
  ArrayNotEmpty,
  IsArray,
  IsLatitude,
  IsLongitude,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PointDto {
  @IsLatitude()
  readonly x: string;
  @IsLongitude()
  readonly y: string;
}

export class SubmitRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PointDto)
  readonly points: PointDto[];
}

import { Point } from '../core/types';

export class PointDto {
  readonly x: string;
  readonly y: string;
}

export class SubmitRequestDto {
  readonly points: PointDto[];
  readonly orderDetailId: number;
}

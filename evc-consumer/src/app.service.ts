import { Injectable } from '@nestjs/common';
import { format, formatToDto, kmeans } from './core/kmeans';
import { Point } from './core/types';
import { PointDto } from './dtos/submitRequest.dto';
import { GoogleMapsService } from './googleMaps.service';

export interface OrderResponse {
  originalPoints: Point[];
  nearestRoads: Point[];
  nearestGasStations: Point[];
}

@Injectable()
export class AppService {
  constructor(private googleMapsService: GoogleMapsService) {}
  async processOrder(points: PointDto[]): Promise<any> {
    const formattedPoints: Point[] = format(points);
    const chargingStationLocations = kmeans(formattedPoints, 1);
    const chargingStationLocationsFormatted = formatToDto(
      chargingStationLocations,
    );

    const nearestRoads = await this.googleMapsService.findNearestRoad(
      chargingStationLocationsFormatted[0],
    );
    const nearestGasStations =
      await this.googleMapsService.findNearestGasStation(
        chargingStationLocationsFormatted[0],
      );

    return {
      originalPoints: chargingStationLocations,
      nearestRoads,
      nearestGasStations,
    };
  }
}

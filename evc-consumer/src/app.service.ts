import { Injectable } from '@nestjs/common';
import { findFurthestPoint, format, formatToDto, kmeans } from './core/kmeans';
import { Point } from './core/types';
import { PointDto } from './dtos/submitRequest.dto';
import { GoogleMapsService } from './googleMaps.service';
import { HttpService } from '@nestjs/axios';

export interface OrderResponse {
  originalPoints: Point[];
  nearestRoads: Point[];
  nearestGasStations: Point[];
  nearPowerLines: any;
}

@Injectable()
export class AppService {
  constructor(
    private googleMapsService: GoogleMapsService,
    private httpService: HttpService,
  ) {}
  async processOrder(points: PointDto[]): Promise<any> {
    const formattedPoints: Point[] = format(points);
    const chargingStationLocations = kmeans(formattedPoints, 1);

    const { distance } = findFurthestPoint(
      chargingStationLocations[0],
      formattedPoints,
    );

    console.log('distance', distance);

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

    const nearPowerLines = await this.getNearPowerLines(
      chargingStationLocationsFormatted[0],
      distance,
    );

    return {
      originalPoints: chargingStationLocations,
      nearestRoads,
      nearestGasStations,
      nearPowerLines,
    };
  }

  generateOverpassQuery(point: PointDto, radius: number): string {
    const query = `[out:json];
    way(around: ${radius ?? 100}, ${point.x}, ${point.y})["power"~"line"];
    out geom;`;
    return query;
  }

  async getNearPowerLines(point: PointDto, radius: number): Promise<any> {
    const query = this.generateOverpassQuery(point, radius);
    const response = await this.httpService
      .post(
        'https://overpass-api.de/api/interpreter',
        { data: query },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .toPromise();

    return response.data?.elements || [];
  }
}

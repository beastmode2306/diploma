import { Injectable } from '@nestjs/common';
import { PointDto } from './dtos/submitRequest.dto';
import { Client } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleMapsService extends Client {
  private readonly accessKey = this.config.get('GOOGLE_API_KEY') as string;

  constructor(private config: ConfigService) {
    super();
  }

  filterResponse<T>(arr: T[], key: keyof T) {
    return [
      ...new Map(
        arr.reverse().map((item) => [JSON.stringify(item[key]), item]),
      ).values(),
    ]
      .reverse()
      .slice(0, 3);
  }

  async findNearestRoad(point: PointDto) {
    const nearestRoadRaw = await this.nearestRoads({
      params: {
        points: [[point.x, point.y].join(',')],
        key: this.accessKey,
      },
    });

    const nearestRoads = nearestRoadRaw?.data?.snappedPoints || [];
    const filteredNearestRoads = this.filterResponse(nearestRoads, 'location');

    return filteredNearestRoads.map((item) => ({
      x: item.location.latitude,
      y: item.location.longitude,
    }));
  }

  async findNearestGasStation(point: PointDto) {
    const placesNearbyRaw = await this.placesNearby({
      params: {
        location: [point.x, point.y].join(','),
        type: 'gas_station',
        rankby: 'distance' as any,
        key: this.accessKey,
      },
    });

    const placesNearby = placesNearbyRaw?.data?.results || [];

    const filteredPlacesNearby = this.filterResponse(placesNearby, 'place_id');

    return filteredPlacesNearby.map((item) => ({
      x: item.geometry.location.lat,
      y: item.geometry.location.lng,
    }));
  }
}

import { Injectable } from '@nestjs/common';
import { PointDto } from './dtos/submitRequest.dto';
import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
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
    let result = null;

    const nearestRoadRaw = await this.nearestRoads({
      params: {
        points: [[point.x, point.y].join(',')],
        key: this.accessKey,
      },
    });

    if (nearestRoadRaw?.data?.snappedPoints == undefined) {
      const nearestRoadViaDirections = await this.directions({
        params: {
          origin: [point.x, point.y].join(','),
          destination: [point.x, point.y].join(','),
          key: this.accessKey,
          mode: TravelMode.driving,
        },
      });

      result = [
        nearestRoadViaDirections?.data?.routes[0]?.legs[0]?.steps[0]
          ?.start_location,
      ];
    } else {
      const nearestRoads = nearestRoadRaw?.data?.snappedPoints || [];
      result = this.filterResponse(nearestRoads, 'location');
    }

    return result.map((item) => ({
      x: item.location?.latitude || item.lat,
      y: item.location?.longitude || item.lng,
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

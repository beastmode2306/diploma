import { Point } from './types';
import { PointDto } from '../dtos/submitRequest.dto';

export function kmeans(
  data: Point[],
  k: number,
  maxIterations: number = 100,
): Point[] {
  // Initialize centroids randomly
  const centroids = data.sort(() => 0.5 - Math.random()).slice(0, k);

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // Assign each data point to the closest centroid
    const labels = data.map((point) =>
      centroids.reduce(
        (closestIndex, centroid, index) =>
          distance(point, centroid) < distance(point, centroids[closestIndex])
            ? index
            : closestIndex,
        0,
      ),
    );

    // Update centroids based on the mean of the assigned data points
    const newCentroids = centroids.map((_, index) => {
      const assignedPoints = data.filter((_, i) => labels[i] === index);
      const sumX = assignedPoints.reduce((sum, point) => sum + point.x, 0);
      const sumY = assignedPoints.reduce((sum, point) => sum + point.y, 0);
      const meanX = sumX / assignedPoints.length;
      const meanY = sumY / assignedPoints.length;
      return { x: meanX, y: meanY };
    });

    // Check for convergence
    if (
      centroids.every((centroid, index) =>
        equalPoints(centroid, newCentroids[index]),
      )
    ) {
      break;
    }

    centroids.splice(0, centroids.length, ...newCentroids);
  }

  return centroids;
}

function distance(pointA: Point, pointB: Point): number {
  const dx = pointA.x - pointB.x;
  const dy = pointA.y - pointB.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function equalPoints(pointA: Point, pointB: Point): boolean {
  return pointA.x === pointB.x && pointA.y === pointB.y;
}

export function format(points: PointDto[]): Point[] {
  return points.map((point) => ({
    x: parseFloat(point.x),
    y: parseFloat(point.y),
  })) as Point[];
}

export function formatToDto(points: Point[]): PointDto[] {
  return points.map((point) => ({
    x: point.x.toString(),
    y: point.y.toString(),
  })) as PointDto[];
}

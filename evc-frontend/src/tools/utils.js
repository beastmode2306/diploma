export function convertCoordinates(data) {
  const result = []

  if (!data) {
    return result
  }

  for (const obj of data) {
    const convertedObj = {
      input: sortPointsClockwise(
        obj.input.map(({ x, y }) => ({ lat: parseFloat(x), lng: parseFloat(y) }))
      ),
      result: {
        originalPoints: obj.result.originalPoints.map(({ x, y }) => ({ lat: x, lng: y })),
        nearestRoads: obj.result.nearestRoads.map(({ x, y }) => ({ lat: x, lng: y })),
        nearestGasStations: obj.result.nearestGasStations.map(({ x, y }) => ({ lat: x, lng: y })),
        nearPowerLines: obj.result.nearPowerLines.map(({ geometry }) =>
          geometry.map(({ lat, lon }) => ({ lat, lng: lon }))
        )
      }
    }

    result.push(convertedObj)
  }

  return result
}

function sortPointsClockwise(points) {
  // Calculate the center point of the polygon
  const center = points.reduce(
    (accumulator, point) => {
      accumulator.lat += point.lat
      accumulator.lng += point.lng
      return accumulator
    },
    { lat: 0, lng: 0 }
  )
  center.lat /= points.length
  center.lng /= points.length

  // Sort the points based on their angle relative to the center point
  points.sort((a, b) => {
    const angleA = Math.atan2(a.lng - center.lng, a.lat - center.lat)
    const angleB = Math.atan2(b.lng - center.lng, b.lat - center.lat)
    return angleA - angleB
  })

  return points
}

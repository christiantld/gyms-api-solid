import { Coordinates } from '@/types'

export function getDistanceBetweenCoordinates(
  from: Coordinates,
  to: Coordinates,
): number {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  // setup Haversine constants
  const earthRadiusInMeters = 6371e3
  const fromRadian = (from.latitude * Math.PI) / 180
  const toRadian = (to.latitude * Math.PI) / 180
  const latitudeDifferenceInRadians =
    ((to.latitude - from.latitude) * Math.PI) / 180
  const longitudeDifferenceInRadians =
    ((to.longitude - from.longitude) * Math.PI) / 180

  // Haversine formula
  const haversineResult =
    Math.sin(latitudeDifferenceInRadians / 2) *
      Math.sin(latitudeDifferenceInRadians / 2) +
    Math.cos(fromRadian) *
      Math.cos(toRadian) *
      Math.sin(longitudeDifferenceInRadians / 2) *
      Math.sin(longitudeDifferenceInRadians / 2)
  const angularDistance =
    2 * Math.atan2(Math.sqrt(haversineResult), Math.sqrt(1 - haversineResult))

  const distanceInMeters = earthRadiusInMeters * angularDistance

  return Number(distanceInMeters.toPrecision(4))
}

import { expect, describe, it } from 'vitest'
import { getDistanceBetweenCoordinates } from './get-distance-between-coordinates'

describe('getDistanceBetweenCoordinates', () => {
  it('should return 0 when the coordinates are the same', () => {
    const from = { latitude: -15.7996325, longitude: -47.8815089 }
    const to = { latitude: -15.7996325, longitude: -47.8815089 }

    const distance = getDistanceBetweenCoordinates(from, to)

    expect(distance).toEqual(0)
  })

  it('should return the correct distance between two coordinates', () => {
    const from = { latitude: -15.809, longitude: -47.94 }
    const to = { latitude: -15.8, longitude: -47.94 }

    const distance = getDistanceBetweenCoordinates(from, to)

    expect(distance).toEqual(1001)
  })
})

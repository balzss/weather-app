import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

type City = {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
}

type GeocodingApiResponse = {
  results?: City[]
}

const fetchCities = async (query: string): Promise<City[]> => {
  if (!query) {
    return []
  }
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=8&language=en&format=json`
  )
  if (!response.ok) {
    throw new Error('Could not fetch cities.')
  }
  const data: GeocodingApiResponse = await response.json()
  return data.results || []
}

export const useCitySearch = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300) // Wait for 300ms after user stops typing

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  const { data: cities, ...queryInfo } = useQuery({
    queryKey: ['cities', debouncedQuery],
    queryFn: () => fetchCities(debouncedQuery),
    enabled: !!debouncedQuery, // Only run query if debouncedQuery is not empty
  })

  return { cities, ...queryInfo }
}

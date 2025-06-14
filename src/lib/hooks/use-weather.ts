import { useQuery } from '@tanstack/react-query'

type WeatherProps = {
  latitude?: number
  longitude?: number
}

const fetchWeather = async ({ latitude, longitude }: WeatherProps) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
  )
  if (!response.ok) {
    throw new Error('Weather data could not be fetched.')
  }
  return response.json()
}

const fetchLocationName = async ({ latitude, longitude }: WeatherProps) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    {
      headers: {
        'User-Agent': 'MyWeatherApp/1.0 (hello@example.com)', // IMPORTANT: Change this to your app name and contact info
      },
    }
  )
  if (!response.ok) {
    throw new Error('Location name could not be fetched.')
  }
  const data = await response.json()
  const address = data.address
  return {
    name: address.city || address.town || address.village || 'Unknown Location',
    country: address.country_code.toUpperCase(),
  }
}

export const useWeather = ({ latitude, longitude }: WeatherProps) => {
  return useQuery({
    queryKey: ['weatherWithLocation', latitude, longitude],
    queryFn: async () => {
      if (!latitude || !longitude) {
        throw new Error('Latitude or longitude is missing.')
      }

      const [weatherData, locationData] = await Promise.all([
        fetchWeather({ latitude, longitude }),
        fetchLocationName({ latitude, longitude }),
      ])

      return { weather: weatherData, location: locationData }
    },
    enabled: !!latitude && !!longitude,
    staleTime: 1000 * 60 * 30,
  })
}

import { useQuery } from '@tanstack/react-query'

type WeatherProps = {
  latitude?: number
  longitude?: number
}

const apiRoot = 'https://api.open-meteo.com'

const fetchWeather = async ({ latitude, longitude }: WeatherProps) => {
  const response = await fetch(
    `${apiRoot}/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
  )
  if (!response.ok) {
    throw new Error('Weather data could not be fetched.')
  }
  return response.json()
}

export const useWeather = ({ latitude, longitude }: WeatherProps) => {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => fetchWeather({ latitude, longitude }),
    enabled: !!latitude && !!longitude, // Only run the query if we have coordinates
  })
}

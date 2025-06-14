'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWeather } from '@/lib/hooks/use-weather' // Make sure this path is correct
import { getWeatherIcon } from '@/lib/utils' // Make sure this path is correct
import { Wind } from 'lucide-react'

export default function HomePage() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Effect to get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log({ position })
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
          setLocationError(null)
        },
        (error) => {
          console.log({ error })
          console.error('Geolocation error:', error)
          setLocationError('Could not get your location. Please search for a city.')
          setCoordinates({ lat: 47.4979, lon: 19.0402 }) // Fallback to Budapest
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    } else {
      setLocationError('Geolocation is not supported by your browser.')
    }
  }, [])

  const {
    data: weather,
    isLoading,
    isError,
    error,
  } = useWeather({ latitude: coordinates?.lat, longitude: coordinates?.lon })

  const renderContent = () => {
    if (!weather && locationError) {
      return <p className="text-center text-red-500">{locationError}</p>
    }

    if (isLoading) {
      return <p className="text-center">Loading weather data...</p>
    }

    if (isError) {
      return <p className="text-center text-red-500">Error: {error?.message}</p>
    }

    if (weather) {
      const { current_weather, daily, timezone } = weather
      // The API gives us a timezone, which we can use as a location name fallback.
      const locationName = timezone.replace(/_/g, ' ').split('/')[1]

      const CurrentWeatherIcon = getWeatherIcon(current_weather.weathercode)

      return (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{locationName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-6xl">
                <CurrentWeatherIcon />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-7xl font-bold">{Math.round(current_weather.temperature)}°C</p>
              <div className="mt-4 flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Wind className="h-5 w-5 text-muted-foreground" />
                  <span>{current_weather.windspeed} km/h</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {locationError && (
            <p className="text-center text-red-500 m-2">
              Could not fetch location. Falling back to Budapest.
            </p>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">5-Day Forecast</h3>
            <div className="grid grid-cols-5 gap-4">
              {daily.time.slice(0, 5).map((date: string, index: number) => {
                const WeatherIcon = getWeatherIcon(daily.weathercode[index])
                return (
                  <Card key={date} className="flex flex-col items-center p-4">
                    <p className="font-semibold">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <div className="text-4xl my-2">
                      <WeatherIcon />
                    </div>
                    <p className="text-sm">
                      {Math.round(daily.temperature_2m_max[index])}° /{' '}
                      {Math.round(daily.temperature_2m_min[index])}°
                    </p>
                  </Card>
                )
              })}
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8"></div>

        {renderContent()}
      </div>
    </main>
  )
}

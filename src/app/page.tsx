'use client'

import { useState, useEffect } from 'react'
import { useWeather } from '@/lib/hooks/use-weather'
import { LargeWeatherCard, SmallWeatherCard, SearchBox, Loader } from '@/components/custom'

export default function HomePage() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Effect to get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
          setLocationError(null)
        },
        (error) => {
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
    data: weatherData,
    isLoading,
    isError,
    error,
  } = useWeather({ latitude: coordinates?.lat, longitude: coordinates?.lon })

  const renderContent = () => {
    if (!weatherData && locationError) {
      return <p className="text-center text-red-500">{locationError}</p>
    }

    if (isLoading) {
      return <Loader text="Loading Weather Data..." />
    }

    if (isError) {
      return <p className="text-center text-red-500">Error: {error?.message}</p>
    }

    if (weatherData) {
      const { current, daily } = weatherData.weather
      const locationName = `${weatherData.location.name}, ${weatherData.location.country}`

      return (
        <>
          <LargeWeatherCard
            weatherCode={current.weather_code}
            locationName={locationName}
            temperature={current.temperature_2m}
            windSpeed={current.wind_speed_10m}
            humidity={current.relative_humidity_2m}
          />
          {locationError && (
            <p className="text-center text-red-500 m-2">
              Could not fetch location. Falling back to Budapest.
            </p>
          )}

          <div className="mt-6 relative">
            <h3 className="text-lg font-semibold">5-Day Forecast</h3>
            <div className="flex overflow-x-auto gap-4 py-4 -mx-4 px-4">
              {daily.time.slice(0, 5).map((date: string, index: number) => {
                return (
                  <SmallWeatherCard
                    date={date}
                    key={date}
                    weatherCode={daily.weather_code[index]}
                    minTemp={daily.temperature_2m_min[index]}
                    maxTemp={daily.temperature_2m_max[index]}
                  />
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
        <div className="mb-8">
          <SearchBox />
        </div>

        {renderContent()}
      </div>
    </main>
  )
}

'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useWeather } from '@/lib/hooks/use-weather'
import { getWeatherInfo } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Wind, Droplets, House } from 'lucide-react'
import { Loader } from '@/components/custom'

function WeatherDetails() {
  const searchParams = useSearchParams()
  const latitude = Number(searchParams.get('lat'))
  const longitude = Number(searchParams.get('long'))

  const { data, isLoading, isError, error } = useWeather({ latitude, longitude })

  if (isLoading) {
    return <Loader text="Loading Weather Details..." />
  }

  if (isError || !latitude || !longitude) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-red-500">Error</h2>
        <p className="text-muted-foreground">
          {error?.message || 'Latitude or longitude missing from URL.'}
        </p>
      </div>
    )
  }

  if (data) {
    const { weather, location } = data
    const { current } = weather
    const weatherInfo = getWeatherInfo(current.weather_code)
    const { icon: WeatherIcon, label: weatherLabel } = weatherInfo

    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">
          {location.name}, {location.country}
        </h1>

        <div className="my-6 text-gray-700">
          <WeatherIcon className="h-32 w-32" />
        </div>

        <p className="text-8xl font-extrabold tracking-tighter">{current.temperature_2m}°C</p>

        <p className="mt-2 text-2xl font-medium text-muted-foreground">{weatherLabel}</p>

        <div className="mt-8 flex w-full justify-around text-lg">
          <div className="flex items-center space-x-2">
            <Wind className="h-6 w-6 text-muted-foreground" />
            <span className="font-semibold">{current.wind_speed_10m} km/h</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-muted-foreground" />
            <span className="font-semibold">{current.relative_humidity_2m}%</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function WeatherDetailsPage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="relative mb-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="absolute left-0 top-0">
            <House className="h-4 w-4" />
            <span className="sr-only">Back to Home</span>
          </Button>
        </Link>
      </div>
      <div className="mt-16">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <WeatherDetails />
        </Suspense>
      </div>
    </main>
  )
}

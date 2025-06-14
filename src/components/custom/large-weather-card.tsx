import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wind } from 'lucide-react'
import { getWeatherIcon } from '@/lib/utils'

type LargeWeatherCardProps = {
  windSpeed: number
  locationName: string
  temperature: number
  weatherCode: number
}

export function LargeWeatherCard({
  windSpeed,
  locationName,
  temperature,
  weatherCode,
}: LargeWeatherCardProps) {
  const CurrentWeatherIcon = getWeatherIcon(weatherCode)
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">{locationName}</CardTitle>
          <p className="text-sm text-muted-foreground">{currentDate}</p>
        </div>
        <div className="text-6xl">
          <CurrentWeatherIcon size={64} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-7xl font-bold">{temperature}°C</p>
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-muted-foreground" />
            <span>{windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { Card } from '@/components/ui/card'
import { getWeatherIcon } from '@/lib/utils'

type SmallWeatherCardProps = {
  weatherCode: number
  date: string
  maxTemp: number
  minTemp: number
}

export function SmallWeatherCard({ weatherCode, date, maxTemp, minTemp }: SmallWeatherCardProps) {
  const WeatherIcon = getWeatherIcon(weatherCode)
  const dayLabel = new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
  return (
    <Card key={date} className="flex flex-col items-center p-4 min-w-[100px] flex-grow">
      <p className="font-semibold">{dayLabel}</p>
      <div className="text-4xl my-2">
        <WeatherIcon />
      </div>
      <p className="text-sm">
        {Math.round(maxTemp)}° / {Math.round(minTemp)}°
      </p>
    </Card>
  )
}

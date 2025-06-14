import { Card } from '@/components/ui/card'
import { getWeatherInfo } from '@/lib/utils'

type SmallWeatherCardProps = {
  weatherCode: number
  date: string
  maxTemp: number
  minTemp: number
}

export function SmallWeatherCard({ weatherCode, date, maxTemp, minTemp }: SmallWeatherCardProps) {
  const { icon: WeatherIcon, label: weatherLabel } = getWeatherInfo(weatherCode)
  const dayLabel = new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
  return (
    <Card
      key={date}
      className="flex flex-col items-center p-4 min-w-[130px] w-full flex-grow gap-3"
    >
      <p className="font-semibold">{dayLabel}</p>
      <div className="text-4xl my-2">
        <WeatherIcon />
      </div>
      <div className="text-muted-foreground text-sm">{weatherLabel}</div>
      <p className="text-sm">
        {Math.round(maxTemp)}° / {Math.round(minTemp)}°
      </p>
    </Card>
  )
}

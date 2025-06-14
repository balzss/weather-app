import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  type LucideIcon,
  Sun,
  Cloud,
  Cloudy,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Snowflake,
} from 'lucide-react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type WeatherInfo = {
  icon: LucideIcon
  label: string
}

export const getWeatherInfo = (weatherCode: number): WeatherInfo => {
  switch (weatherCode) {
    case 0:
      return { icon: Sun, label: 'Sunny' }
    case 1:
      return { icon: Cloudy, label: 'Mainly Clear' }
    case 2:
      return { icon: Cloudy, label: 'Partly Cloudy' }
    case 3:
      return { icon: Cloud, label: 'Overcast' }
    case 45:
    case 48:
      return { icon: CloudFog, label: 'Fog' }
    case 51:
      return { icon: CloudDrizzle, label: 'Light Drizzle' }
    case 53:
      return { icon: CloudDrizzle, label: 'Moderate Drizzle' }
    case 55:
      return { icon: CloudDrizzle, label: 'Dense Drizzle' }
    case 56:
      return { icon: CloudDrizzle, label: 'Light Freezing Drizzle' }
    case 57:
      return { icon: CloudDrizzle, label: 'Dense Freezing Drizzle' }
    case 61:
      return { icon: CloudRain, label: 'Slight Rain' }
    case 63:
      return { icon: CloudRain, label: 'Moderate Rain' }
    case 65:
      return { icon: CloudRain, label: 'Heavy Rain' }
    case 66:
      return { icon: CloudRain, label: 'Light Freezing Rain' }
    case 67:
      return { icon: CloudRain, label: 'Heavy Freezing Rain' }
    case 71:
      return { icon: CloudSnow, label: 'Slight Snowfall' }
    case 73:
      return { icon: CloudSnow, label: 'Moderate Snowfall' }
    case 75:
      return { icon: CloudSnow, label: 'Heavy Snowfall' }
    case 77:
      return { icon: Snowflake, label: 'Snow Grains' }
    case 80:
      return { icon: CloudRain, label: 'Slight Rain Showers' }
    case 81:
      return { icon: CloudRain, label: 'Moderate Rain Showers' }
    case 82:
      return { icon: CloudRain, label: 'Violent Rain Showers' }
    case 85:
      return { icon: CloudSnow, label: 'Slight Snow Showers' }
    case 86:
      return { icon: CloudSnow, label: 'Heavy Snow Showers' }
    case 95:
      return { icon: CloudLightning, label: 'Thunderstorm' }
    case 96:
      return { icon: CloudLightning, label: 'Thunderstorm with Slight Hail' }
    case 99:
      return { icon: CloudLightning, label: 'Thunderstorm with Heavy Hail' }
    default:
      return { icon: Sun, label: 'Unknown' }
  }
}

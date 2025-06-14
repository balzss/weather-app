import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Sun, Cloud, CloudRain, Snowflake, type LucideIcon } from 'lucide-react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getWeatherIcon = (weatherCode: number): LucideIcon => {
  switch (weatherCode) {
    case 0:
      return Sun
    case 1:
    case 2:
    case 3:
      return Cloud
    case 61:
    case 63:
    case 65:
      return CloudRain
    case 71:
    case 73:
    case 75:
      return Snowflake
    // Add more cases for other weather codes
    default:
      return Sun
  }
}

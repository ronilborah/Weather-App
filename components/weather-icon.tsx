import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react"

export function WeatherIcon({
  weather,
  size = 48,
  className = "",
}: {
  weather: string
  size?: number
  className?: string
}) {
  const iconProps = { size, className: `drop-shadow-lg ${className}` }

  switch (weather) {
    case "sunny":
      return <Sun {...iconProps} className={`text-yellow-400 ${iconProps.className}`} />
    case "cloudy":
      return <Cloud {...iconProps} className={`text-gray-300 ${iconProps.className}`} />
    case "rainy":
      return <CloudRain {...iconProps} className={`text-blue-400 ${iconProps.className}`} />
    case "snowy":
      return <CloudSnow {...iconProps} className={`text-blue-200 ${iconProps.className}`} />
    default:
      return <Sun {...iconProps} className={`text-yellow-400 ${iconProps.className}`} />
  }
}

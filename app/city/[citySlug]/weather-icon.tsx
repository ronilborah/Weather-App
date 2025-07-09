import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react"

export const WeatherIcon = ({ weather, size = 48 }: { weather: string; size?: number }) => {
  const iconProps = { size, className: "drop-shadow-lg" }

  switch (weather) {
    case "sunny":
      return <Sun {...iconProps} className="text-yellow-400 drop-shadow-lg animate-pulse" />
    case "cloudy":
      return <Cloud {...iconProps} className="text-gray-300 drop-shadow-lg" />
    case "rainy":
      return <CloudRain {...iconProps} className="text-blue-400 drop-shadow-lg" />
    case "snowy":
      return <CloudSnow {...iconProps} className="text-blue-200 drop-shadow-lg" />
    default:
      return <Sun {...iconProps} />
  }
}

import { type NextRequest, NextResponse } from "next/server"

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "your-api-key-here"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // Get current weather for the city to show preview data
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(query)}&aqi=no`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const weatherData = await response.json()

    // Transform to our city format
    const cityData = {
      name: weatherData.location.name,
      country: weatherData.location.country,
      region: weatherData.location.region,
      current: Math.round(weatherData.current.temp_c),
      minTemp: Math.round(weatherData.current.temp_c - 5), // Approximate min
      maxTemp: Math.round(weatherData.current.temp_c + 5), // Approximate max
      weather: getWeatherCondition(weatherData.current.condition.code),
      condition: weatherData.current.condition.text,
    }

    return NextResponse.json(cityData)
  } catch (error) {
    console.error("Weather preview API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather preview" }, { status: 500 })
  }
}

function getWeatherCondition(code: number): string {
  // Map WeatherAPI condition codes to our weather types
  if (code === 1000) return "sunny"
  if ([1003, 1006, 1009].includes(code)) return "cloudy"
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) return "rainy"
  if (
    [
      1066, 1069, 1072, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264,
    ].includes(code)
  )
    return "snowy"
  return "sunny" // default
}

import { type NextRequest, NextResponse } from "next/server"
import { getForecastWeather } from "@/lib/weather-api"

export async function GET(request: NextRequest, { params }: { params: { city: string } }) {
  try {
    const city = decodeURIComponent(params.city)
    const weatherData = await getForecastWeather(city, 5)

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Weather API route error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

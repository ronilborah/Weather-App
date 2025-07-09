// WeatherAPI.com integration
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "32f0f807791140dd874134405250907"
const BASE_URL = "https://api.weatherapi.com/v1"

export interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
  forecast: {
    forecastday: Array<{
      date: string
      date_epoch: number
      day: {
        maxtemp_c: number
        maxtemp_f: number
        mintemp_c: number
        mintemp_f: number
        avgtemp_c: number
        avgtemp_f: number
        maxwind_mph: number
        maxwind_kph: number
        totalprecip_mm: number
        totalprecip_in: number
        totalsnow_cm: number
        avgvis_km: number
        avgvis_miles: number
        avghumidity: number
        daily_will_it_rain: number
        daily_chance_of_rain: number
        daily_will_it_snow: number
        daily_chance_of_snow: number
        condition: {
          text: string
          icon: string
          code: number
        }
        uv: number
      }
      astro: {
        sunrise: string
        sunset: string
        moonrise: string
        moonset: string
        moon_phase: string
        moon_illumination: string
        is_moon_up: number
        is_sun_up: number
      }
      hour: Array<{
        time_epoch: number
        time: string
        temp_c: number
        temp_f: number
        is_day: number
        condition: {
          text: string
          icon: string
          code: number
        }
        wind_mph: number
        wind_kph: number
        wind_degree: number
        wind_dir: string
        pressure_mb: number
        pressure_in: number
        precip_mm: number
        precip_in: number
        humidity: number
        cloud: number
        feelslike_c: number
        feelslike_f: number
        windchill_c: number
        windchill_f: number
        heatindex_c: number
        heatindex_f: number
        dewpoint_c: number
        dewpoint_f: number
        will_it_rain: number
        chance_of_rain: number
        will_it_snow: number
        chance_of_snow: number
        vis_km: number
        vis_miles: number
        gust_mph: number
        gust_kph: number
        uv: number
      }>
    }>
  }
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching current weather:", error)
    throw error
  }
}

export async function getForecastWeather(city: string, days = 5): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=yes&alerts=yes`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching forecast weather:", error)
    throw error
  }
}

export function getWeatherCondition(code: number): string {
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

"use client"

import React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  Droplets,
  Wind,
  Gauge,
  Sunrise,
  Sunset,
  Eye,
  Thermometer,
  CloudRain,
  Snowflake,
  Sun,
  Moon,
  Cloud,
} from "lucide-react"
import { WeatherIcon } from "@/components/weather-icon"
import { WeatherBackground } from "./weather-background"
import type { WeatherData } from "@/lib/weather-api"
import { getWeatherCondition } from "@/lib/weather-api"
import * as RechartsPrimitive from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { gsap } from "gsap"
import Aurora from "@/components/Aurora"

const StatCard = ({
  icon: Icon,
  label,
  value,
  unit = "",
}: { icon: any; label: string; value: string | number; unit?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const setX = useRef<any>(null);
  const setY = useRef<any>(null);

  // Setup GSAP setters on mount
  React.useEffect(() => {
    if (!cardRef.current) return;
    setX.current = gsap.quickSetter(cardRef.current, "--mouse-x", "px");
    setY.current = gsap.quickSetter(cardRef.current, "--mouse-y", "px");
  }, []);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setX.current?.(x);
    setY.current?.(y);
  };

  // Mouse leave handler (center the spotlight)
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setX.current?.(rect.width / 2);
    setY.current?.(rect.height / 2);
  };

  return (
    <div
      ref={cardRef}
      className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-lg transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
      style={{
        // Use percentage for initial state
        "--mouse-x": "50%",
        "--mouse-y": "50%",
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-3 relative z-10">
        <Icon size={20} className="text-blue-400" />
        <div>
          <p className="text-gray-300 text-sm">{label}</p>
          <p className="text-white font-semibold">
            {value}
            {unit}
          </p>
        </div>
      </div>
      {/* Spotlight effect - more visible color */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 group-hover:opacity-100 opacity-80"
        style={{
          background:
            "radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.18), rgba(255,255,255,0.10) 60%, transparent 100%)",
        }}
      />
    </div>
  );
};

const ForecastCard = ({ forecast }: { forecast: any }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 min-w-[140px] shadow-lg transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
    <div className="text-center">
      <p className="text-gray-300 text-sm mb-2">
        {new Date(forecast.date).toLocaleDateString("en-US", { weekday: "short" })}
      </p>
      <div className="flex justify-center mb-2">
        <WeatherIcon weather={getWeatherCondition(forecast.day.condition.code)} size={32} />
      </div>
      <div className="text-white">
        <span className="font-semibold">{Math.round(forecast.day.maxtemp_c)}°</span>
        <span className="text-gray-300 ml-1">{Math.round(forecast.day.mintemp_c)}°</span>
      </div>
      <p className="text-xs text-gray-300 mt-1">{forecast.day.condition.text}</p>
    </div>
  </div>
)

const HourlyCard = ({ hour }: { hour: any }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-3 min-w-[100px] shadow-lg transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
    <div className="text-center">
      <p className="text-gray-300 text-xs mb-2">
        {new Date(hour.time).toLocaleTimeString("en-US", { hour: "numeric" })}
      </p>
      <div className="flex justify-center mb-2">
        <WeatherIcon weather={getWeatherCondition(hour.condition.code)} size={24} />
      </div>
      <p className="text-white font-semibold text-sm">{Math.round(hour.temp_c)}°</p>
      <p className="text-xs text-gray-300">{hour.chance_of_rain}%</p>
    </div>
  </div>
)

export default function CityPage({ params }: { params: Promise<{ citySlug: string }> }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params)
  const citySlug = unwrappedParams.citySlug
  const cityName = decodeURIComponent(citySlug).replace(/-/g, " ")

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/weather/${encodeURIComponent(cityName)}`)

        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }

        const data = await response.json()
        setWeatherData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [citySlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading weather data...</div>
      </div>
    )
  }

  if (error || !weatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Error loading weather data</div>
          <p className="text-gray-400 mb-4">{error}</p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const currentWeather = weatherData.current
  const location = weatherData.location
  const forecast = weatherData.forecast.forecastday
  const todayForecast = forecast[0]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Aurora animated background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#1e293b", "#2563eb", "#3b82f6"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      {/* Removed WeatherBackground */}

      {/* Content */}
      <div className="relative z-10 min-h-screen bg-black/20 backdrop-blur-sm">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* City header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide">{location.name}</h1>
            <p className="text-lg text-gray-300 mb-4">
              {location.region}, {location.country}
            </p>

            <div className="flex justify-center mb-6">
              <WeatherIcon weather={getWeatherCondition(currentWeather.condition.code)} size={80} />
            </div>

            <div className="text-6xl md:text-7xl font-bold text-white mb-2">{Math.round(currentWeather.temp_c)}°C</div>
            <p className="text-xl text-gray-300 mb-2">{currentWeather.condition.text}</p>
            <p className="text-sm text-gray-400">Feels like {Math.round(currentWeather.feelslike_c)}°C</p>
          </div>

          {/* Current Weather Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            <StatCard icon={Droplets} label="Humidity" value={currentWeather.humidity} unit="%" />
            <StatCard icon={Wind} label="Wind Speed" value={Math.round(currentWeather.wind_kph)} unit=" km/h" />
            <StatCard icon={Gauge} label="Pressure" value={Math.round(currentWeather.pressure_mb)} unit=" hPa" />
            <StatCard icon={Eye} label="Visibility" value={Math.round(currentWeather.vis_km)} unit=" km" />
            <StatCard icon={Sun} label="UV Index" value={currentWeather.uv} />
            <StatCard icon={Thermometer} label="Feels Like" value={Math.round(currentWeather.feelslike_c)} unit="°C" />
          </div>

          {/* More Weather Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            <StatCard icon={Thermometer} label="Temperature (°F)" value={Math.round(currentWeather.temp_f)} unit="°F" />
            <StatCard icon={Wind} label="Wind Speed (mph)" value={Math.round(currentWeather.wind_mph)} unit=" mph" />
            <StatCard icon={Wind} label="Wind Direction (°)" value={currentWeather.wind_degree} unit="°" />
            <StatCard icon={Gauge} label="Pressure (in)" value={currentWeather.pressure_in} unit=" in" />
            <StatCard icon={CloudRain} label="Precipitation (mm)" value={currentWeather.precip_mm} unit=" mm" />
            <StatCard icon={CloudRain} label="Precipitation (in)" value={currentWeather.precip_in} unit=" in" />
            <StatCard icon={Cloud} label="Cloud Cover" value={currentWeather.cloud} unit="%" />
            <StatCard icon={Thermometer} label="Feels Like (°F)" value={Math.round(currentWeather.feelslike_f)} unit="°F" />
            <StatCard icon={Eye} label="Visibility (miles)" value={Math.round(currentWeather.vis_miles)} unit=" mi" />
            <StatCard icon={Wind} label="Gust (mph)" value={Math.round(currentWeather.gust_mph)} unit=" mph" />
            <StatCard icon={Wind} label="Gust (kph)" value={Math.round(currentWeather.gust_kph)} unit=" km/h" />
          </div>

          {/* Additional Weather Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard icon={Sunrise} label="Sunrise" value={todayForecast.astro.sunrise} />
            <StatCard icon={Sunset} label="Sunset" value={todayForecast.astro.sunset} />
            <StatCard icon={CloudRain} label="Chance of Rain" value={todayForecast.day.daily_chance_of_rain} unit="%" />
            <StatCard icon={Snowflake} label="Chance of Snow" value={todayForecast.day.daily_chance_of_snow} unit="%" />
          </div>

          {/* Hourly Forecast */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">24-Hour Forecast</h2>
            <div className="w-full max-w-3xl mx-auto">
              <ChartContainer
                config={{ temp: { label: 'Temperature', color: '#60a5fa' } }}
                style={{ width: '100%', height: 300 }}
              >
                <RechartsPrimitive.LineChart data={todayForecast.hour} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <RechartsPrimitive.XAxis
                    dataKey="time"
                    tickFormatter={t => new Date(t).toLocaleTimeString('en-US', { hour: 'numeric' })}
                    stroke="#cbd5e1"
                  />
                  <RechartsPrimitive.YAxis
                    dataKey="temp_c"
                    domain={['auto', 'auto']}
                    stroke="#cbd5e1"
                    tickFormatter={v => `${Math.round(v)}°`}
                  />
                  <RechartsPrimitive.Tooltip
                    content={<ChartTooltipContent labelKey="time" nameKey="temp_c" />}
                    formatter={v => `${Math.round(Number(v))}°C`}
                  />
                  <RechartsPrimitive.Line
                    type="monotone"
                    dataKey="temp_c"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{ r: 4, stroke: '#60a5fa', strokeWidth: 2, fill: '#1e293b' }}
                    activeDot={{ r: 6 }}
                  />
                </RechartsPrimitive.LineChart>
              </ChartContainer>
            </div>
          </div>

          {/* 5-day forecast */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {forecast.map((forecastDay: any, index: number) => (
                <ForecastCard key={index} forecast={forecastDay} />
              ))}
            </div>
          </div>

          {/* Moon Phase & Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard icon={Moon} label="Moon Phase" value={todayForecast.astro.moon_phase} />
            <StatCard icon={Sun} label="Moon Illumination" value={todayForecast.astro.moon_illumination} unit="%" />
            <StatCard icon={Wind} label="Wind Direction" value={currentWeather.wind_dir} />
          </div>
        </main>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import Link from "next/link"
import { Cloud, Sun, CloudRain, CloudSnow, X, GripVertical } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useCities } from "@/components/city-context"

interface City {
  id: string
  name: string
  weather: string
  minTemp: number
  maxTemp: number
  current: number
  country?: string
}

const WeatherIcon = ({ weather, size = 48 }: { weather: string; size?: number }) => {
  const iconProps = { size, className: "text-white drop-shadow-lg" }

  switch (weather) {
    case "sunny":
      return <Sun {...iconProps} className="text-yellow-400 drop-shadow-lg" />
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

export const DraggableCityCard = ({ city }: { city: City }) => {
  const { removeCity } = useCities()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: city.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeCity(city.name)
  }

  // Create URL-safe city name
  const citySlug = encodeURIComponent(city.name.toLowerCase().replace(/\s+/g, "-"))

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative transition-all duration-200 ${isDragging ? "z-50 rotate-3 scale-105" : "z-10"}`}
    >
      <div
        className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${
          isDragging ? "shadow-2xl bg-white/20 border-blue-400/50" : ""
        }`}
      >
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing p-1 rounded-lg hover:bg-white/10"
        >
          <GripVertical size={16} className="text-gray-400" />
        </div>

        {/* Remove button */}
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 z-20"
        >
          <X size={16} />
        </button>

        {/* Card content - wrapped in Link but with pointer-events handling */}
        <Link href={`/city/${citySlug}`} className="block">
          <div className="flex flex-col items-center space-y-4 pt-2">
            <h3 className="text-xl font-bold text-white text-center group-hover:text-blue-400 transition-colors">
              {city.name}
            </h3>

            <div className="transform group-hover:scale-110 transition-transform duration-300">
              <WeatherIcon weather={city.weather} size={56} />
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{city.current}°C</div>
              <div className="text-sm text-gray-300">
                {city.minTemp}°C / {city.maxTemp}°C
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

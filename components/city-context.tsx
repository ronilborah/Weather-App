"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface City {
  id: string
  name: string
  weather: string
  minTemp: number
  maxTemp: number
  current: number
  country?: string
  region?: string
  condition?: string
  addedAt?: number // Timestamp when city was added
}

interface CityContextType {
  pinnedCities: City[]
  addCity: (city: Omit<City, "id" | "addedAt">) => void
  removeCity: (citySlug: string) => void
  reorderCities: (cities: City[]) => void
  clearAllCities: () => void
  isLoading: boolean
}

const CityContext = createContext<CityContextType | undefined>(undefined)

const STORAGE_KEY = "weatherverse_pinned_cities"
const STORAGE_VERSION = "1.0"

// No default cities. Start empty if nothing in storage.

// Generate consistent ID from city name
const generateCityId = (citySlug: string): string => {
  return citySlug
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim()
}

// Save cities to localStorage with error handling
const saveCitiesToStorage = (cities: City[]): void => {
  try {
    const dataToSave = {
      version: STORAGE_VERSION,
      cities,
      lastUpdated: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    console.log(`Saved ${cities.length} cities to localStorage`)
  } catch (error) {
    console.error("Failed to save cities to localStorage:", error)
  }
}

// Load cities from localStorage with error handling and migration
const loadCitiesFromStorage = (): City[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      console.log("No saved cities found, starting empty")
      return []
    }

    const parsedData = JSON.parse(saved)

    // Handle legacy format (direct array)
    if (Array.isArray(parsedData)) {
      console.log("Migrating from legacy storage format")
      const migratedCities = parsedData.map((city: any) => ({
        ...city,
        id: city.id || generateCityId(city.name),
        addedAt: city.addedAt || Date.now(),
      }))
      // Save in new format
      saveCitiesToStorage(migratedCities)
      return migratedCities
    }

    // Handle new format
    if (parsedData.version && parsedData.cities) {
      const cities = parsedData.cities.map((city: any) => ({
        ...city,
        id: city.id || generateCityId(city.name),
        addedAt: city.addedAt || Date.now(),
      }))
      console.log(`Loaded ${cities.length} cities from localStorage`)
      return cities
    }

    console.log("Invalid storage format, starting empty")
    return []
  } catch (error) {
    console.error("Failed to load cities from localStorage:", error)
    return []
  }
}

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [pinnedCities, setPinnedCities] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cities from localStorage on mount
  useEffect(() => {
    const loadedCities = loadCitiesFromStorage()
    setPinnedCities(loadedCities)
    setIsLoading(false)
  }, [])

  // Save cities to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && pinnedCities.length > 0) {
      saveCitiesToStorage(pinnedCities)
    }
  }, [pinnedCities, isLoading])

  const addCity = (cityData: Omit<City, "id" | "addedAt">) => {
    setPinnedCities((prev) => {
      // Check if city already exists
      const existingCity = prev.find((c) => c.name.toLowerCase() === cityData.name.toLowerCase())
      if (existingCity) {
        console.log(`City ${cityData.name} already exists`)
        return prev
      }

      const newCity: City = {
        ...cityData,
        id: generateCityId(cityData.name),
        addedAt: Date.now(),
      }

      console.log(`Adding new city: ${newCity.name}`)
      return [...prev, newCity]
    })
  }

  const removeCity = (citySlug: string) => {
    setPinnedCities((prev) => {
      const filtered = prev.filter((city) => city.id !== citySlug)
      console.log(`Removed city: ${citySlug}`)
      return filtered
    })
  }

  const reorderCities = (cities: City[]) => {
    setPinnedCities(cities)
    console.log("Cities reordered")
  }

  const clearAllCities = () => {
    setPinnedCities([])
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log("All cities cleared")
    } catch (error) {
      console.error("Failed to clear localStorage:", error)
    }
  }

  return (
    <CityContext.Provider value={{ pinnedCities, addCity, removeCity, reorderCities, clearAllCities, isLoading }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCities() {
  const context = useContext(CityContext)
  if (context === undefined) {
    throw new Error("useCities must be used within a CityProvider")
  }
  return context
}

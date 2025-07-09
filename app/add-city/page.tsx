"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Plus, Check, Search, MapPin, Trash2, Clock } from "lucide-react"
import { useCities } from "@/components/city-context"
import { useState, useEffect, useCallback } from "react"
import Silk from "@/components/silk"

interface SearchResult {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
  displayName: string
}

interface CityPreview {
  name: string
  country: string
  region: string
  current: number
  minTemp: number
  maxTemp: number
  weather: string
  condition: string
}

const WeatherIcon = ({ weather, size = 32 }: { weather: string; size?: number }) => {
  switch (weather) {
    case "sunny":
      return <span className="text-yellow-400 text-2xl">☀️</span>
    case "cloudy":
      return <span className="text-gray-400 text-2xl">☁️</span>
    case "rainy":
      return <span className="text-blue-400 text-2xl">🌧️</span>
    case "snowy":
      return <span className="text-blue-200 text-2xl">❄️</span>
    default:
      return <span className="text-yellow-400 text-2xl">☀️</span>
  }
}

const CityCard = ({ city }: { city: CityPreview }) => {
  const { pinnedCities, addCity } = useCities()
  const [isAdding, setIsAdding] = useState(false)

  const isAlreadyAdded = pinnedCities.some((c) => c.name.toLowerCase() === city.name.toLowerCase())

  const handleAdd = async () => {
    if (isAlreadyAdded) return

    setIsAdding(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      addCity({
        name: city.name,
        country: city.country,
        region: city.region,
        current: city.current,
        minTemp: city.minTemp,
        maxTemp: city.maxTemp,
        weather: city.weather,
        condition: city.condition,
      })
    } catch (error) {
      console.error("Error adding city:", error)
    } finally {
      setIsAdding(false)
    }
  }

  // Create URL-safe city name
  const citySlug = encodeURIComponent(city.name.toLowerCase().replace(/\s+/g, "-"))

  return (
    <Link href={`/city/${citySlug}`} className="block group focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{city.name}</h3>
            <p className="text-sm text-gray-300">
              {city.region && `${city.region}, `}
              {city.country}
            </p>
          </div>
          <WeatherIcon weather={city.weather} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-white">{city.current}°C</div>
            <div className="text-sm text-gray-300">{city.condition}</div>
          </div>

          <button
            onClick={e => { e.preventDefault(); handleAdd(); }}
            disabled={isAlreadyAdded || isAdding}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium ${isAlreadyAdded
              ? "bg-transparent text-green-400 cursor-not-allowed backdrop-blur-sm border border-green-400/30"
              : isAdding
                ? "bg-transparent text-blue-400 cursor-not-allowed backdrop-blur-sm border border-blue-400/30"
                : "bg-transparent hover:bg-white/10 text-blue-400 hover:text-blue-300 backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50"
              }`}
          >
            {isAlreadyAdded ? (
              <>
                <Check size={16} />
                Added
              </>
            ) : isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <Plus size={16} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}

const SearchResultItem = ({
  result,
  onSelect,
  isHighlighted,
}: {
  result: SearchResult
  onSelect: (result: SearchResult) => void
  isHighlighted?: boolean
}) => (
  <button
    onClick={() => onSelect(result)}
    className={`w-full text-left px-4 py-3 transition-colors duration-200 flex items-center gap-3 border-b border-white/5 last:border-b-0 ${isHighlighted ? "bg-white/15" : "hover:bg-white/10"
      }`}
  >
    <MapPin size={16} className="text-blue-400 flex-shrink-0" />
    <div>
      <div className="text-white font-medium">{result.name}</div>
      <div className="text-gray-300 text-sm">
        {result.region && `${result.region}, `}
        {result.country}
      </div>
    </div>
  </button>
)

const RecentSearches = ({ onSelectCity }: { onSelectCity: (cityName: string) => void }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem("weatherverse_recent_searches")
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }
    } catch (error) {
      console.error("Error loading recent searches:", error)
    }
  }, [])

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("weatherverse_recent_searches")
  }

  if (recentSearches.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Clock size={18} />
          Recent Searches
        </h3>
        <button
          onClick={clearRecentSearches}
          className="bg-transparent hover:bg-white/10 text-red-400 hover:text-red-300 p-2 rounded-lg transition-all duration-200 border border-red-400/30 hover:border-red-300/50"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentSearches.slice(0, 6).map((search, index) => (
          <button
            key={index}
            onClick={() => onSelectCity(search)}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-sm text-white transition-all duration-200"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AddCityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedCities, setSelectedCities] = useState<CityPreview[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingPreview, setIsLoadingPreview] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  // Save recent searches
  const saveRecentSearch = (citySlug: string) => {
    try {
      const saved = localStorage.getItem("weatherverse_recent_searches")
      let recentSearches: string[] = saved ? JSON.parse(saved) : []

      // Remove if already exists and add to front
      recentSearches = recentSearches.filter((search) => search !== citySlug)
      recentSearches.unshift(citySlug)

      // Keep only last 10 searches
      recentSearches = recentSearches.slice(0, 10)

      localStorage.setItem("weatherverse_recent_searches", JSON.stringify(recentSearches))
    } catch (error) {
      console.error("Error saving recent search:", error)
    }
  }

  // Debounced search function - now triggers with just 1 character
  const searchCities = useCallback(async (query: string) => {
    if (query.length < 1) {
      setSearchResults([])
      setShowResults(false)
      setHighlightedIndex(-1)
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search-cities?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const results = await response.json()
        setSearchResults(results)
        setShowResults(true)
        setHighlightedIndex(-1) // Reset highlight when new results come in
      }
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
      setShowResults(false)
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Reduced debounce time for faster response
  useEffect(() => {
    const timer = setTimeout(() => {
      searchCities(searchTerm)
    }, 150) // Reduced from 300ms to 150ms

    return () => clearTimeout(timer)
  }, [searchTerm, searchCities])

  // Keyboard navigation for search results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || searchResults.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
          handleSelectCity(searchResults[highlightedIndex])
        }
        break
      case "Escape":
        setShowResults(false)
        setHighlightedIndex(-1)
        break
    }
  }

  const handleSelectCity = async (result: SearchResult) => {
    // Use the full location data for more accurate weather lookup
    const locationQuery = result.region && result.region !== result.name
      ? `${result.name}, ${result.region}, ${result.country}`
      : `${result.name}, ${result.country}`

    await loadCityPreview(locationQuery)
  }

  const handleRecentSearchSelect = async (citySlug: string) => {
    await loadCityPreview(citySlug)
  }

  const loadCityPreview = async (citySlug: string) => {
    setIsLoadingPreview(true)
    setShowResults(false)
    setSearchTerm("")
    setHighlightedIndex(-1)

    try {
      const response = await fetch(`/api/weather-preview?q=${encodeURIComponent(citySlug)}`)
      if (response.ok) {
        const cityPreview = await response.json()
        setSelectedCities((prev) => {
          // Avoid duplicates
          if (prev.some((city) => city.name.toLowerCase() === cityPreview.name.toLowerCase())) {
            return prev
          }
          return [...prev, cityPreview]
        })

        // Save to recent searches
        saveRecentSearch(citySlug)
      }
    } catch (error) {
      console.error("Preview error:", error)
    } finally {
      setIsLoadingPreview(false)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".search-container")) {
        setShowResults(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Silk background */}
      <div className="fixed inset-0 z-0">
        <Silk speed={7} scale={1.5} color="#334155" noiseIntensity={0.6} rotation={0.05} />
      </div>

      {/* Gradient overlay for better contrast */}
      <div className="fixed inset-0 z-10 bg-gradient-to-br from-gray-900/50 via-blue-900/30 to-gray-900/50"></div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors duration-200 drop-shadow-lg"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-white tracking-wider drop-shadow-lg">Add City</h1>
            <div></div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Recent searches */}
        <RecentSearches onSelectCity={handleRecentSearchSelect} />

        {/* Search section */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto search-container">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                autoComplete="off"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Search Results Dropdown - Now shows 10 results */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden z-30 max-h-80 overflow-y-auto shadow-2xl">
                <div className="px-3 py-2 border-b border-white/10 bg-white/5">
                  <p className="text-xs text-gray-300">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                  </p>
                </div>
                {searchResults.slice(0, 10).map((result, index) => (
                  <SearchResultItem
                    key={result.id}
                    result={result}
                    onSelect={handleSelectCity}
                    isHighlighted={index === highlightedIndex}
                  />
                ))}
                {searchResults.length > 10 && (
                  <div className="px-4 py-2 text-xs text-gray-400 bg-white/5 border-t border-white/10">
                    Showing first 10 results. Type more to narrow down.
                  </div>
                )}
              </div>
            )}

            {/* No results message */}
            {showResults && searchResults.length === 0 && !isSearching && searchTerm.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 z-30">
                <p className="text-gray-300 text-sm text-center">No cities found for "{searchTerm}"</p>
                <p className="text-gray-400 text-xs text-center mt-1">Try a different spelling or city name</p>
              </div>
            )}
          </div>

          {isLoadingPreview && (
            <div className="text-center mt-4">
              <div className="text-white">Loading weather data...</div>
            </div>
          )}
        </div>

        {/* Selected Cities */}
        {selectedCities.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 drop-shadow-lg">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {selectedCities.map((city, index) => (
                <CityCard key={`${city.name}-${index}`} city={city} />
              ))}
            </div>
          </div>
        )}

        {/* Clean empty state - removed all text suggestions */}
        {selectedCities.length === 0 && !isLoadingPreview && (
          <div className="text-center py-12">
            <Search className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-300 text-lg drop-shadow-sm mb-2">Search for cities to add</p>
          </div>
        )}
      </main>
    </div>
  )
}

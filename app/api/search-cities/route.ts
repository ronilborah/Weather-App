import { type NextRequest, NextResponse } from "next/server"

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "your-api-key-here"

// Priority countries and regions for better city matching
const PRIORITY_COUNTRIES = [
  "India", "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Japan", "China", "Brazil", "Mexico", "Italy",
  "Spain", "Netherlands", "Switzerland", "Sweden", "Norway", "Denmark"
]

// Major cities that should be prioritized when there are multiple matches
const MAJOR_CITIES = [
  "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Pune",
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "London", "Manchester", "Birmingham", "Liverpool", "Leeds",
  "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton",
  "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"
]

function getCityPriority(city: any): number {
  let priority = 0

  // Prioritize major cities
  if (MAJOR_CITIES.includes(city.name)) {
    priority += 100
  }

  // Prioritize priority countries
  if (PRIORITY_COUNTRIES.includes(city.country)) {
    priority += 50
  }

  // Prioritize capital cities (often have region as country name or are major cities)
  if (city.region === city.country || !city.region) {
    priority += 25
  }

  // Prioritize cities with more specific regions (indicating larger cities)
  if (city.region && city.region !== city.name) {
    priority += 10
  }

  return priority
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    // Reduced minimum query length to 1 character for faster suggestions
    if (!query || query.length < 1) {
      return NextResponse.json({ error: "Query must be at least 1 character" }, { status: 400 })
    }

    // Use WeatherAPI.com's search endpoint to get matching cities
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(query)}`,
      {
        // Add cache headers for better performance
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const cities = await response.json()

    // Transform the response and add priority scores
    const transformedCities = cities.map((city: any) => ({
      id: city.id,
      name: city.name,
      region: city.region,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      url: city.url,
      // Create a display name that includes region and country for clarity
      displayName: `${city.name}${city.region ? `, ${city.region}` : ""}, ${city.country}`,
      priority: getCityPriority(city)
    }))

    // Sort by priority (highest first) and then by name for consistency
    const sortedResults = transformedCities.sort((a: any, b: any) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority
      }
      return a.name.localeCompare(b.name)
    })

    // Return up to 15 results (we'll show 10 in UI but have extras for better matching)
    const limitedResults = sortedResults.slice(0, 15).map((city: any) => ({
      id: city.id,
      name: city.name,
      region: city.region,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      url: city.url,
      displayName: city.displayName
    }))

    return NextResponse.json(limitedResults, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (error) {
    console.error("Search cities API error:", error)
    return NextResponse.json({ error: "Failed to search cities" }, { status: 500 })
  }
}

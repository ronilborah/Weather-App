import { type NextRequest, NextResponse } from "next/server"

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "your-api-key-here"

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

    // Transform the response to match our expected format
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
    }))

    // Return up to 15 results (we'll show 10 in UI but have extras for better matching)
    const limitedResults = transformedCities.slice(0, 15)

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

import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CityProvider } from "@/components/city-context"

export const metadata: Metadata = {
  title: "WeatherVerse - Modern Weather App",
  description: "A beautiful weather app with 3D animations and modern UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-mono antialiased">
        <CityProvider>{children}</CityProvider>
      </body>
    </html>
  )
}

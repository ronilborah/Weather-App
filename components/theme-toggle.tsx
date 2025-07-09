"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-gray-800/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 dark:border-gray-700/50 rounded-xl p-3 hover:bg-gray-800/70 dark:hover:bg-gray-800/70 transition-all duration-300 text-white dark:text-white"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

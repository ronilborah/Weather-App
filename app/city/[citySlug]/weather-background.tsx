export const WeatherBackground = ({ weather }: { weather: string }) => {
  const getBackgroundElements = () => {
    switch (weather) {
      case "sunny":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/60 via-blue-500/50 to-blue-600/60">
            {/* Sun */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute top-24 right-24 w-24 h-24 bg-yellow-300 rounded-full animate-pulse delay-500"></div>

            {/* Floating clouds */}
            <div className="absolute top-32 left-10 w-20 h-12 bg-white/20 rounded-full blur-sm animate-bounce delay-1000"></div>
            <div className="absolute top-40 left-1/3 w-16 h-8 bg-white/15 rounded-full blur-sm animate-bounce delay-2000"></div>
          </div>
        )

      case "cloudy":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/60 via-gray-700/50 to-gray-800/60">
            {/* Moving clouds */}
            <div className="absolute top-10 left-0 w-40 h-20 bg-gray-500/30 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute top-20 left-20 w-60 h-30 bg-gray-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-32 right-10 w-50 h-25 bg-gray-500/25 rounded-full blur-lg animate-pulse delay-2000"></div>

            {/* Floating particles */}
            <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping delay-500"></div>
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping delay-1500"></div>
          </div>
        )

      case "rainy":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700/60 via-blue-800/50 to-gray-900/60">
            {/* Rain drops */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-8 bg-blue-300/60 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 1}s`,
                }}
              ></div>
            ))}

            {/* Dark clouds */}
            <div className="absolute top-5 left-10 w-60 h-30 bg-gray-800/40 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-15 right-20 w-80 h-40 bg-gray-700/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
        )

      case "snowy":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300/60 via-gray-400/50 to-gray-500/60">
            {/* Snowflakes */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/80 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 1}s`,
                }}
              ></div>
            ))}

            {/* Ground snow */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-white/50 rounded-t-full blur-2xl"></div>
          </div>
        )

      default:
        return <div className="absolute inset-0 bg-gradient-to-br from-blue-400/60 via-blue-500/50 to-blue-600/60"></div>
    }
  }

  return <div className="fixed inset-0 overflow-hidden">{getBackgroundElements()}</div>
}

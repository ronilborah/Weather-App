# WeatherVerse - Modern Weather App

A beautiful, modern weather application built with Next.js 15, TypeScript, and Tailwind CSS. Features real-time weather data, 3D animations, drag-and-drop city management, and a stunning Silk shader background.

## ✨ Features

- 🌤️ **Real-time Weather Data** - Powered by WeatherAPI.com
- 🎨 **Modern UI/UX** - Glass morphism design with animated backgrounds
- 🎭 **3D Silk Background** - Custom WebGL shader animations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔍 **Smart City Search** - Autocomplete with live weather previews
- 🎯 **Drag & Drop** - Reorder your favorite cities
- 💾 **Local Storage** - Your cities are saved automatically
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🌙 **Dark/Light Theme** - Toggle between themes
- 🎪 **Weather Animations** - Dynamic backgrounds based on weather conditions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- WeatherAPI.com API key (free)

### Run the App

```bash
# Clone and setup
git clone https://github.com/ronilborah/Weather-App.git
cd Weather-App
npm install

# Run setup script (creates .env.local automatically)
npm run setup

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Note:** The setup script will create a `.env.local` file with instructions. Just replace `your_api_key_here` with your actual API key from [WeatherAPI.com](https://www.weatherapi.com/).

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@dnd-kit** - Drag and drop functionality
- **WeatherAPI.com** - Weather data provider
- **Lucide React** - Beautiful icons

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

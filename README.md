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
- npm, yarn, or pnpm
- WeatherAPI.com API key (free)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ronilborah/Weather-App.git
   cd Weather-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here" > .env.local
   ```

4. **Get your WeatherAPI.com API key**
   - Visit [WeatherAPI.com](https://www.weatherapi.com/)
   - Sign up for a free account
   - Get your API key from the dashboard
   - Replace `your_api_key_here` in `.env.local` with your actual API key

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

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

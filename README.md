# WeatherVerse - Modern Weather App

A beautiful, modern weather application built with Next.js 15, TypeScript, and Tailwind CSS. Features real-time weather data, 3D animations, drag-and-drop city management, and a stunning Silk shader background.

## Features

- 🌤️ **Real-time Weather Data** - Powered by WeatherAPI.com
- 🎨 **Modern UI/UX** - Glass morphism design with animated backgrounds
- 🎭 **3D Silk Background** - Custom WebGL shader animations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔍 **Smart City Search** - Autocomplete with live weather previews
- 🎯 **Drag & Drop** - Reorder your favorite cities
- 💾 **Local Storage** - Your cities are saved automatically
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- WeatherAPI.com API key (free)

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # If you have the code, navigate to the project directory
   cd weatherverse-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   # Copy the example environment file
   cp .env.example .env.local
   \`\`\`

4. **Get your WeatherAPI.com API key**
   - Visit [WeatherAPI.com](https://www.weatherapi.com/)
   - Sign up for a free account
   - Get your API key from the dashboard
   - Add it to your `.env.local` file:
   \`\`\`env
   NEXT_PUBLIC_WEATHER_API_KEY=your_actual_api_key_here
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
weatherverse-app/
├── frontend/                 # Frontend application code
│   ├── app/                 # Next.js App Router pages
│   │   ├── add-city/       # Add city page
│   │   ├── city/           # Individual city weather pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable React components
│   │   ├── city-context.tsx
│   │   ├── draggable-city-card.tsx
│   │   ├── silk.tsx        # 3D background component
│   │   └── weather-icon.tsx
│   └── lib/                # Utility functions and API
│       └── weather-api.ts  # Weather API integration
├── app/api/                # API routes
│   ├── search-cities/      # City search endpoint
│   ├── weather/           # Weather data endpoint
│   └── weather-preview/   # Weather preview endpoint
├── public/                # Static assets
├── .env.example          # Environment variables template
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@dnd-kit** - Drag and drop functionality
- **WeatherAPI.com** - Weather data provider
- **Lucide React** - Beautiful icons

## Configuration

### Weather API
The app uses WeatherAPI.com for weather data. Make sure to:
1. Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)
2. Add it to your `.env.local` file
3. The free tier includes 1 million calls per month

### Customization
- **Colors**: Modify `tailwind.config.ts` for theme colors
- **Animations**: Adjust Silk shader parameters in `frontend/components/silk.tsx`
- **Default Cities**: Change default cities in `frontend/components/city-context.tsx`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `NEXT_PUBLIC_WEATHER_API_KEY` environment variable
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues:
1. Check that your API key is correctly set
2. Ensure all dependencies are installed
3. Check the browser console for errors
4. Verify your Node.js version (18+)

## Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons by [Lucide](https://lucide.dev/)
- 3D graphics powered by [Three.js](https://threejs.org/)

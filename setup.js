#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌤️  WeatherVerse Setup Script');
console.log('==============================\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
    console.log('✅ .env.local already exists');
    console.log('📝 Your app is ready to run!\n');
} else {
    // Create .env.local with the default API key
    const envContent = `# WeatherAPI.com API Key
# Using default API key for immediate setup
# You can replace this with your own API key from https://www.weatherapi.com/
NEXT_PUBLIC_WEATHER_API_KEY=32f0f807791140dd874134405250907
`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env.local file with default API key');
    console.log('🚀 Your app is ready to run!\n');
}

console.log('🚀 You can now run: npm run dev');
console.log('🌐 Then open: http://localhost:3000\n');
console.log('💡 Optional: Get your own API key from https://www.weatherapi.com/ for higher rate limits'); 
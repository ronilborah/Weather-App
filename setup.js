#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌤️  WeatherVerse Setup Script');
console.log('==============================\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
    console.log('✅ .env.local already exists');
    console.log('📝 Please update your API key in .env.local if needed\n');
} else {
    // Create .env.local with placeholder
    const envContent = `# WeatherAPI.com API Key
# Get your free API key from: https://www.weatherapi.com/
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here

# Instructions:
# 1. Visit https://www.weatherapi.com/
# 2. Sign up for a free account
# 3. Get your API key from the dashboard
# 4. Replace 'your_api_key_here' with your actual API key
`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env.local file');
    console.log('📝 Please update your API key in .env.local');
    console.log('🔗 Get your free API key from: https://www.weatherapi.com/\n');
}

console.log('🚀 You can now run: npm run dev');
console.log('🌐 Then open: http://localhost:3000\n'); 
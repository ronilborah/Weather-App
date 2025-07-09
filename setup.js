#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🌤️  WeatherVerse Setup Script');
console.log('==============================\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
    console.log('✅ .env.local already exists');
    console.log('📝 Please update your API key in .env.local if needed\n');
    console.log('🚀 You can now run: npm run dev');
    console.log('🌐 Then open: http://localhost:3000\n');
    rl.close();
} else {
    console.log('🔑 WeatherAPI.com API Key Setup');
    console.log('================================\n');
    console.log('To get your free API key:');
    console.log('1. Visit https://www.weatherapi.com/');
    console.log('2. Sign up for a free account');
    console.log('3. Get your API key from the dashboard\n');

    rl.question('Enter your WeatherAPI.com API key: ', (apiKey) => {
        if (!apiKey || apiKey.trim() === '') {
            console.log('\n❌ API key is required. Please run the setup again with a valid API key.');
            rl.close();
            return;
        }

        // Create .env.local with the actual API key
        const envContent = `# WeatherAPI.com API Key
NEXT_PUBLIC_WEATHER_API_KEY=${apiKey.trim()}
`;

        fs.writeFileSync(envPath, envContent);
        console.log('\n✅ Created .env.local file with your API key');
        console.log('🚀 You can now run: npm run dev');
        console.log('🌐 Then open: http://localhost:3000\n');
        rl.close();
    });
} 
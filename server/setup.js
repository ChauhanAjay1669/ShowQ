const fs = require('fs');
const path = require('path');

// Step 1: Create .env file
const envPath = path.join(__dirname, '.env');
const envContent = `PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/quickshow
JWT_SECRET=quickshow_secret_key_12345
JWT_REFRESH_SECRET=quickshow_refresh_secret_key_12345
JWT_EXPIRE=30d
JWT_REFRESH_EXPIRE=7d
FRONTEND_URL=http://localhost:5173

# Razorpay (Optional for dev, required for payments)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
`;

console.log('📝 Creating .env file...');
fs.writeFileSync(envPath, envContent, 'utf8');
console.log('✅ .env file created at:', envPath);

// Verify
const content = fs.readFileSync(envPath, 'utf8');
console.log('\n📋 .env file content:');
console.log('---START---');
console.log(content);
console.log('---END---');
console.log(`\n✅ File size: ${content.length} bytes`);

if (content.includes('MONGO_URI=mongodb://127.0.0.1:27017/quickshow')) {
    console.log('✅ MONGO_URI is correctly set');
} else {
    console.error('❌ MONGO_URI not found in .env file!');
}

console.log('\n🎯 Next steps:');
console.log('1. Restart your server with: npm run dev');
console.log('2. Run: node server/seedData.js to populate database');

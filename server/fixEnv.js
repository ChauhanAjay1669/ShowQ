const fs = require('fs');
const path = require('path');

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

try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file written successfully to:', envPath);

    const readBack = fs.readFileSync(envPath, 'utf8');
    if (readBack.length > 0) {
        console.log('✅ Verification: File is not empty.');
        console.log('--- Content Start ---');
        console.log(readBack);
        console.log('--- Content End ---');
    } else {
        console.error('❌ Verification Failed: File is empty!');
    }
} catch (error) {
    console.error('❌ Error writing .env file:', error);
}

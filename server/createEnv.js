const fs = require('fs');
const path = require('path');

const envContent = `PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/quickshow
JWT_SECRET=quickshow_secret_key_12345
JWT_REFRESH_SECRET=quickshow_refresh_secret_key_12345
JWT_EXPIRE=30d
JWT_REFRESH_EXPIRE=7d
FRONTEND_URL=http://localhost:5173

# Razorpay (Optional for dev, required for payments)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
`;

fs.writeFileSync(path.join(__dirname, '.env'), envContent);
console.log('.env file created successfully');

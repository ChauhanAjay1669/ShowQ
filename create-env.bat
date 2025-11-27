@echo off
echo PORT=5000 > server\.env
echo NODE_ENV=development >> server\.env
echo MONGO_URI=mongodb://127.0.0.1:27017/quickshow >> server\.env
echo JWT_SECRET=quickshow_secret_key_12345 >> server\.env
echo JWT_REFRESH_SECRET=quickshow_refresh_secret_key_12345 >> server\.env
echo JWT_EXPIRE=30d >> server\.env
echo JWT_REFRESH_EXPIRE=7d >> server\.env
echo FRONTEND_URL=http://localhost:5173 >> server\.env
echo RAZORPAY_KEY_ID=rzp_test_1234567890demo >> server\.env
echo RAZORPAY_KEY_SECRET=1234567890abcdefghijklmnopqrstuv >> server\.env
echo.
echo ✅ .env file created successfully with demo keys!
echo.
echo 📝 File contents:
echo ================================================
type server\.env
echo ================================================
echo.
echo ⚠️  NOTE: Using demo Razorpay keys for testing
echo    Get real keys from: https://dashboard.razorpay.com/
echo.

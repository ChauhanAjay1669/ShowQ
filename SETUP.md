# QuickShow - Complete Setup Guide

## ✅ What I've Added

### Demo Payment System
- **Demo Razorpay Keys**: Payments work in test mode
- **No Real Charges**: All transactions are simulated
- **Full UX**: Users can test the complete booking flow

## Quick Start

### 1. Create Environment File
```bash
create-env.bat
```

This creates `server/.env` with:
- MongoDB connection
- JWT secrets
- **Demo Razorpay keys** (test mode)

### 2. Seed Database
```bash
node server\completeSetup.js
```

Adds:
- 24 Premium Movies
- 10 Categories
- Admin User: `admin@quickshow.com` / `Admin@1234`
- Test User: `test@quickshow.com` / `Test@1234`

### 3. Start Server
```bash
cd server
npm run dev
```

## 🎯 Demo Payment Features

### How It Works
1. User selects movie → theater → seats
2. Proceeds to checkout
3. **Payment is auto-completed in demo mode**
4. Order is created successfully
5. User sees confirmation

### Benefits
✅ Test full booking flow  
✅ No payment gateway signup needed  
✅ Perfect for development  
✅ Easy to upgrade to real payments later

### Upgrading to Real Payments
1. Sign up at: https://dashboard.razorpay.com/
2. Get your test keys (starts with `rzp_test_`)
3. Update `.env` file:
   ```
   RAZORPAY_KEY_ID=rzp_test_your_real_key
   RAZORPAY_KEY_SECRET=your_real_secret
   ```
4. Restart server - payments will use real Razorpay

## 📊 What's Included

### Movies (24)
- **Hollywood**: Inception, Interstellar, Oppenheimer, Avatar 2
- **Bollywood**: Jawan, Pathaan, Animal, Dunki
- **South Indian**: RRR, KGF 2, Pushpa, Vikram, Jailer

### Features
- Movie browsing with trailers
- Theater selection (dummy data)
- Premium seat selection UI
- Demo payment processing
- Order history
- Admin dashboard

## 🚀 Start Building!

Your app is ready for development with realistic demo data and payment flow!

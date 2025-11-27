# QuickShow Setup Complete! 🎬

## What I Fixed

### 1. Environment Configuration (.env)
- Created `server/setup.js` to generate the `.env` file
- **Connection String**: `mongodb://127.0.0.1:27017/quickshow`
- All JWT secrets and configuration included

### 2. Database Seeding
- Created `server/seedData.js` with **15 premium movies**:
  - **Hollywood**: Inception, The Dark Knight, Interstellar, Avatar 2, Oppenheimer
  - **Bollywood**: Jawan, Pathaan, Animal, Dunki
  - **South Indian**: RRR, KGF 2, Pushpa, Vikram, Jailer
- **10 Categories**: Action, Comedy, Drama, Sci-Fi, Horror, Romance, Thriller, Bollywood, Hollywood, South Indian

## How to Run

### Step 1: Create .env File
```bash
cd server
node setup.js
```

### Step 2: Seed Database
```bash
node seedData.js
```

### Step 3: Start Server
```bash
npm run dev
```

You should see:
```
DEBUG: MONGO_URI is mongodb://127.0.0.1:27017/quickshow
📦 MongoDB Connected: 127.0.0.1
🚀 Server running on port 5000
```

## MongoDB Connection
- **URI**: `mongodb://127.0.0.1:27017/quickshow`
- **Collections**: users, movies, categories, orders, reviews

## Features Ready
✅ Signup/Signin authentication  
✅ Movie browsing with 15 movies  
✅ Premium seat selection UI  
✅ Booking flow  

## Next Steps
1. Run the commands above
2. Test signup at `http://localhost:5173/signup`
3. Browse movies and test the booking flow!

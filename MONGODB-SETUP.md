# MongoDB Setup & Connection Guide

## The Problem
Your server is getting 500 errors because MongoDB isn't running or isn't installed.

## Solution: 3 Simple Steps

### Step 1: Check if MongoDB is Installed
Open Command Prompt and run:
```bash
mongod --version
```

**If you see a version number** → MongoDB is installed, go to Step 2  
**If you get "not recognized" error** → MongoDB is not installed, follow installation below

### Step 2: Start MongoDB Service

**Option A: Start as Windows Service (Recommended)**
```bash
net start MongoDB
```

**Option B: Start MongoDB Manually**
```bash
mongod
```
Leave this window open - MongoDB will run here

### Step 3: Verify MongoDB is Running
Open a new terminal and run:
```bash
mongosh
```
or
```bash
mongo
```

If you see `test>` or similar prompt, MongoDB is running! ✅

---

## If MongoDB is NOT Installed

### Download & Install MongoDB Community Edition
1. Go to: https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Run the installer - **check "Install MongoDB as a Service"**
4. Complete installation
5. MongoDB will auto-start

### Quick Install via Chocolatey (Alternative)
```bash
choco install mongodb
```

---

## After MongoDB is Running

Run these commands in your project folder:

```bash
# 1. Create .env file
create-env.bat

# 2. Add movies and admin user to database
node server\completeSetup.js

# 3. Start your server
cd server
npm run dev
```

## Verify Connection
Your server terminal should show:
```
DEBUG: MONGO_URI is mongodb://127.0.0.1:27017/quickshow
📦 MongoDB Connected: 127.0.0.1
🚀 Server running on port 5000
```

## MongoDB Compass (Optional GUI)
Download MongoDB Compass to view your data visually:
- URL: https://www.mongodb.com/try/download/compass
- Connection String: `mongodb://127.0.0.1:27017/quickshow`

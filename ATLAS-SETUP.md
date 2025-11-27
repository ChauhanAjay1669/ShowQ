# Quick Fix: Use MongoDB Atlas (Cloud Database)

## Why This is Easier
- No local installation needed
- Works immediately
- Free forever tier
- Professional setup

## Setup Steps (5 minutes)

### 1. Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/Email
3. Click "Create" to make a free cluster

### 2. Create Cluster
- Choose **M0 (Free tier)**
- Select region closest to you
- Click "Create Deployment"
- Wait 1-3 minutes for cluster creation

### 3. Create Database User
1. Click "Database Access" (left menu)
2. Click "Add New Database User"
3. Username: `quickshow`
4. Password: `QuickShow123` (or your choice)
5. Click "Add User"

### 4. Allow Network Access
1. Click "Network Access" (left menu)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. Get Connection String
1. Click "Database" (left menu)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://quickshow:<password>@cluster0.xxxxx.mongodb.net/`)
5. **Replace `<password>` with your actual password**

### 6. Example Connection String
```
mongodb+srv://quickshow:QuickShow123@cluster0.xxxxx.mongodb.net/quickshow?retryWrites=true&w=majority
```

## Tell me your connection string and I'll update everything!

Or if you prefer local MongoDB, try running Command Prompt **as Administrator** and install with:
```bash
winget install MongoDB.Server
```

# Installing MongoDB Locally on Windows

## Method 1: Direct Download (Recommended)

### Step 1: Download MongoDB
1. Go to: **https://www.mongodb.com/try/download/community**
2. Select:
   - Version: **7.0.x** (Latest stable)
   - Platform: **Windows x64**
   - Package: **MSI**
3. Click **Download**

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **Complete** installation
3. **IMPORTANT**: Check ✅ **"Install MongoDB as a Service"**
4. Click through and finish installation

### Step 3: Verify Installation
Open a **NEW** Command Prompt (close old ones) and run:
```bash
mongod --version
```

You should see version information like:
```
db version v7.0.5
Build Info: ...
```

### Step 4: MongoDB Should Auto-Start
MongoDB installs as a Windows service and starts automatically.

To check if it's running, open **Windows Services** (Win + R, type `services.msc`):
- Look for **MongoDB Server** in the list
- Status should be **Running**

---

## Method 2: Using Chocolatey (Faster)

If you have Chocolatey package manager:

Open **PowerShell as Administrator** and run:
```powershell
choco install mongodb
```

Then start MongoDB:
```powershell
net start MongoDB
```

---

## Method 3: Using Winget (Windows Package Manager)

Open **PowerShell or Command Prompt as Administrator**:

```bash
winget install MongoDB.Server
```

---

## After Installation is Complete

### 1. Verify MongoDB is Running
Open a new Command Prompt and run:
```bash
mongosh
```
or
```bash
mongo
```

If you see a prompt like `test>`, MongoDB is running! ✅

### 2. Run Setup Scripts
```bash
# Navigate to your project
cd D:\STUDY MATERIAL\ShowQ\quickshow

# Create .env file
create-env.bat

# Seed database with movies and admin user
node server\completeSetup.js

# Start your server
cd server
npm run dev
```

### 3. Expected Output
```
DEBUG: MONGO_URI is mongodb://127.0.0.1:27017/quickshow
✅ Connected to MongoDB
📦 MongoDB Connected: 127.0.0.1
🚀 Server running on port 5000
```

---

## Troubleshooting

### If MongoDB Service Won't Start
1. Open **Command Prompt as Administrator**
2. Navigate to MongoDB bin folder (usually):
   ```
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   ```
3. Create data directory:
   ```
   mkdir C:\data\db
   ```
4. Start manually:
   ```
   mongod
   ```

### If Port 27017 is Already in Use
Check what's using the port:
```bash
netstat -ano | findstr :27017
```

---

## Quick Install Link
**Direct Download**: https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.5-signed.msi

After installation, come back and run the setup scripts!

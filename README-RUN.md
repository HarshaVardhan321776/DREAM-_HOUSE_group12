# How to Run DreamHouse Project

This project requires **TWO servers** to run simultaneously:
1. **JSON Server** (Backend API) - Port 3001
2. **React App** (Frontend) - Port 3000

---

## Prerequisites

Make sure you have Node.js installed. Check by running:
```powershell
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

---

## Step-by-Step Instructions

### Step 1: Install Dependencies (First Time Only)

Open PowerShell and navigate to the project folder:
```powershell
cd "C:\Users\HP\OneDrive\Dokumen\dreamhouse-master\dreamhouse-master"
```

Install all required packages:
```powershell
npm install
```

---

### Step 2: Start JSON Server (Backend API)

**Open Terminal/PowerShell Window #1:**

```powershell
cd "C:\Users\HP\OneDrive\Dokumen\dreamhouse-master\dreamhouse-master"
npm run server
```

**You should see:**
```
JSON Server is running on http://localhost:3001
API endpoints available at http://localhost:3001/api
```

**✅ Keep this terminal window OPEN** - The server must keep running!

---

### Step 3: Start React App (Frontend)

**Open a NEW Terminal/PowerShell Window #2:**

```powershell
cd "C:\Users\HP\OneDrive\Dokumen\dreamhouse-master\dreamhouse-master"
npm start
```

**You should see:**
```
Compiled successfully!
You can now view real-estate-main in the browser.
  Local:            http://localhost:3000
```

The browser should automatically open to `http://localhost:3000`

---

## Quick Start (Alternative Method)

### Option 1: Use Batch Files

1. **Double-click `start-server.bat`** - Starts JSON Server
2. **Open a new PowerShell** and run:
   ```powershell
   cd "C:\Users\HP\OneDrive\Dokumen\dreamhouse-master\dreamhouse-master"
   npm start
   ```

---

## What Each Server Does

### JSON Server (Port 3001)
- Stores user signup/login data in `db.json`
- Stores property purchase requests in `db.json`
- Provides REST API endpoints at `http://localhost:3001/api`

### React App (Port 3000)
- Frontend user interface
- Handles user interactions
- Connects to JSON Server for data storage

---

## Troubleshooting

### ❌ "JSON Server is not running" Error
**Solution:** Make sure Terminal #1 is running `npm run server` and shows the success message.

### ❌ Port Already in Use
**Solution:** 
- Close any other applications using port 3000 or 3001
- Or change the port in `server.js` (line 13) and `package.json`

### ❌ "Cannot find module" Error
**Solution:** Run `npm install` in the project folder.

### ❌ Page Not Loading
**Solution:** 
1. Check both terminals are running
2. Make sure you're accessing `http://localhost:3000` (not 3001)
3. Check browser console for errors (F12)

---

## Stopping the Servers

- Press `Ctrl + C` in each terminal window to stop the servers
- Always stop both servers when done

---

## Project Structure

```
dreamhouse-master/
├── db.json          # Database file (users & requests)
├── server.js        # JSON Server configuration
├── package.json     # Project dependencies
├── src/            # React source code
│   ├── pages/      # Signup, Login, Home, PropertyDetails
│   ├── components/ # Header, Footer, etc.
│   └── utils/      # API functions
└── public/         # Static files
```

---

## Features

✅ User Signup - Saves to `db.json`  
✅ User Login - Validates from `db.json`  
✅ Property Search & Browse  
✅ Contact Owner - Saves requests to `db.json`  
✅ User Account Display in Navbar  

---

**Need Help?** Make sure both servers are running before testing any features!


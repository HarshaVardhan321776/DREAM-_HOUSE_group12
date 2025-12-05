# How to Start the JSON Server

## Quick Start

### Option 1: Double-click the batch file
- Double-click `start-server.bat` in the project folder

### Option 2: Use PowerShell/Command Prompt

1. **Open PowerShell** (or Command Prompt)

2. **Navigate to the project folder:**
   ```powershell
   cd "C:\Users\HP\OneDrive\Dokumen\dreamhouse-master\dreamhouse-master"
   ```

3. **Start the JSON Server:**
   ```powershell
   npm run server
   ```

4. **You should see:**
   ```
   JSON Server is running on http://localhost:3001
   API endpoints available at http://localhost:3001/api
   ```

5. **Keep this terminal window open** - the server needs to keep running!

6. **Open a NEW terminal** for the React app:
   ```powershell
   cd "C:\Users\HP\OneDrive\Dokumen\dreamhouse-master\dreamhouse-master"
   npm start
   ```

## Important Notes

- ✅ The JSON Server MUST be running before you try to sign up or log in
- ✅ Keep the server terminal open while using the app
- ✅ The server runs on port 3001 with `/api` prefix
- ✅ Data is saved to `db.json` in the project folder

## Troubleshooting

If you see "JSON Server is not running":
1. Make sure you ran `npm run server` in a terminal
2. Check that port 3001 is not being used by another application
3. Verify you're in the correct project folder


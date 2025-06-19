# 🚀 Running Locally

## 📦 Prerequisites
- Termux installed via F-Droid
- Node.js and Git installed using `pkg install nodejs git`
- nano as optional CLI editor
- MongoDB not yet connected, but UI + API run correctly

## 🏃‍♀️ Android – Termux Steps (all verified ✅)
1. Update packages
   ```bash
   pkg update && pkg upgrade
   ```
2. Clone the repo
   ```bash
   git clone https://github.com/Kanegraffiti/3mtt-Capstone.git
   ```
3. Install backend dependencies
   ```bash
   cd 3mtt-Capstone && cd server && npm install
   ```
4. Install frontend dependencies
   ```bash
   cd ../client && npm install
   ```
5. Manually create `.env` files for both server and client
6. Start the backend
   ```bash
   cd server && npm run dev
   ```
7. In another session start the frontend
   ```bash
   cd client && npm run dev -- --host
   ```
8. Open the Vite "Network" URL in your mobile browser (e.g. `http://192.168.x.x:3000`)
9. Frontend UI works ✅
10. Backend runs ✅
11. MongoDB fails to connect (expected, no cloud URI yet)

### 🔐 Environment files
Environment files were created manually:

<details>
<summary>server/.env</summary>

```env
MONGO_URI=mongodb://localhost:27017/fake
JWT_SECRET=testkey
TMDB_API_KEY=your_tmdb_key
PORT=5000
```
</details>

<details>
<summary>client/.env</summary>

```env
VITE_API_URL=http://localhost:5000
```
</details>

## 🧠 MongoDB Setup (Optional)
1. Create a free MongoDB Atlas cluster
2. Whitelist `0.0.0.0/0`
3. Use a non-SRV connection string (Driver 3.6 or earlier)
4. Update `MONGO_URI` in `server/.env`
5. Restart backend using `npm run dev`

## 🖥️ Windows Setup
1. Install Node.js and Git
2. Clone the repo
3. Install server and client dependencies
4. Create `.env` files manually (same keys as above)
5. Run backend and frontend in two terminal windows
6. Open `http://localhost:3000` in browser

## 🧪 Production Instructions
1. Build frontend using `npm run build`
2. Serve via Express or static server
3. Backend uses `npm start`

Made with ☕, 🍫, and the relentless spirit of a Nigerian dev 🦅

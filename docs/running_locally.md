# Running the App Locally

This guide covers getting the Movie Recommendation app running on Android using Termux and on Windows.

## Android (Termux)
1. Install **[Termux](https://f-droid.org/en/packages/com.termux/)** from F-Droid.
2. Update packages:
   ```bash
   pkg update && pkg upgrade
   ```
3. Install the required tools:
   ```bash
   pkg install git nodejs
   ```
4. Clone this repository and install dependencies:
   ```bash
   git clone <repo-url>
   cd 3mtt-Capstone
   cd server && npm install
   cd ../client && npm install
   ```
5. Copy the example environment files and edit them with your values:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
   These files contain placeholders for:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `TMDB_API_KEY`
   - `PORT`
   - `VITE_API_URL`
6. Start the backend and frontend in separate Termux sessions:
   ```bash
   npm --prefix server run dev
   npm --prefix client run dev
   ```
7. Open your mobile browser to [http://localhost:3000](http://localhost:3000).

## Windows
1. Install **[Node.js](https://nodejs.org/)** and **[Git](https://git-scm.com/)**.
2. Open **Command Prompt** or **Git Bash** and clone the repository:
   ```bash
   git clone <repo-url>
   cd 3mtt-Capstone
   ```
3. Install dependencies for both projects:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
4. Copy the example environment files:
   ```bash
   copy server\.env.example server\.env
   copy client\.env.example client\.env
   ```
   These files include variables named `MONGO_URI`, `JWT_SECRET`, `TMDB_API_KEY`, `PORT` and `VITE_API_URL`.
5. In two terminals start the servers:
   ```bash
   npm --prefix server run dev
   npm --prefix client run dev
   ```
6. Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

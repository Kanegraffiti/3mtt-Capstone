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
   git clone https://github.com/3mtt-org/movie-recommendation-app.git
   cd movie-recommendation-app
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
   git clone https://github.com/3mtt-org/movie-recommendation-app.git
   cd movie-recommendation-app
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

## Local Production Build

When you're ready to run the project without the development servers:

1. Build the React frontend:
   ```bash
   npm --prefix client run build
   ```
   The optimized files will be in `client/dist`.
2. Start the API server using the `start` script:
   ```bash
   npm --prefix server start
   ```
   Ensure the variables in `server/.env` are set. The backend will run on the
   port specified by `PORT`.
3. You can serve the `client/dist` folder with any static file server or
   configure Express to serve it directly for a simple production setup.

## Deploying to Vercel

1. Push your repository to GitHub (or any git provider).
2. Log in to [Vercel](https://vercel.com/) and import the project from GitHub.
3. Set the `VITE_API_URL` environment variable to the URL of your backend.
4. Vercel will build the React app automatically on each deploy.

## Deploying to Render

1. Create a new Web Service on [Render](https://render.com/) and connect your
   GitHub repository.
2. Set the `MONGO_URI`, `JWT_SECRET` and `TMDB_API_KEY` environment variables
   in the Render dashboard.
3. The start command should be `npm start` and the root directory should be
   `server`.
4. Once deployed, update `VITE_API_URL` on Vercel (or in your local `.env` file)
   to point to the Render service URL.

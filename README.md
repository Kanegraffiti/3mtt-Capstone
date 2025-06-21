# MyMovies

![build](https://github.com/3mtt-org/movie-recommendation-app/actions/workflows/build.yml/badge.svg)

**Live Demo:** [Frontend](https://3mtt-capstone-one.vercel.app) • [Backend](https://threemtt-capstone.onrender.com)

This is a full-stack movie recommendation application built with the MERN stack. The frontend uses **React** with **Tailwind CSS** for styling and the backend is an **Express** API connected to **MongoDB**. Movie data is fetched from the [TMDB API](https://www.themoviedb.org/).

## Features
- JWT based authentication with registration and login
- Browse trending movies and search by title
- Save movies to personal watchlists (multiple lists supported)
- Rate and review movies
- Responsive mobile‑first UI built with React and Tailwind CSS

## Setup
1. Clone the repository and install dependencies for both `server` and `client`:
   ```bash
   git clone https://github.com/3mtt-org/movie-recommendation-app.git
   cd movie-recommendation-app
   cd server && npm install
   cd ../client && npm install
   ```
2. Copy the example environment files and fill in your credentials:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
   The samples define the following variables:
   - `MONGO_URI` – MongoDB connection string
   - `JWT_SECRET` – secret for signing JWT tokens
   - `TMDB_API_KEY` – your TMDB API key
   - `PORT` – Express server port
   - `VITE_API_URL` – URL of the backend API for the React app
3. Start the development servers in separate terminals:
   ```bash
   # Server on port 5000
   npm --prefix server run dev
   
   # Client on port 3000
   npm --prefix client run dev
   ```

## Deployment
1. Build the PWA assets:
   ```bash
   npm --prefix client run build
   ```
   The build output in `client/dist` includes the generated `manifest.webmanifest` and service worker.
2. Deploy the **frontend** to **Vercel** and set the `VITE_API_URL` environment variable so the React app can reach the Render backend.
   If this variable isn't provided or accidentally points to `localhost`, the client now falls back to the hosted backend URL.
3. Deploy the **backend** to **Render** with environment variables `MONGO_URI`, `JWT_SECRET`, and `TMDB_API_KEY` configured.
   Vercel will automatically run the build script when deploying.
4. Optional GitHub Actions workflows can be added to automate deployments.

## Documentation
Beginner friendly guides for running the project locally on Termux and Windows are available in [`docs/running_locally.md`](docs/running_locally.md).

Enjoy your new movie recommendation app!

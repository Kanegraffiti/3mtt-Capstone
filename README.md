# Movie Recommendation App

## Overview
A fullstack application that allows users to search movies using the TMDB API, maintain watchlists and favorites, and review films.

## Tech Stack
- **Frontend:** React, Axios, Vercel
- **Backend:** Express, MongoDB, Render

## Folder Structure
```
backend/       Express API server
frontend/      React application
```

## API Routes
- **Auth:** `/api/auth/*`
- **Movies:** `/api/movies/*`

## How to Run Locally
1. Create a MongoDB Atlas database (or use a local MongoDB instance).
2. Copy the example environment files and edit them with your credentials:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
   Then open each `.env` file and supply values for:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `TMDB_API_KEY`
   - `REACT_APP_API_URL`
   - `REACT_APP_TMDB_KEY`
3. Install backend dependencies and start the server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
4. In a new terminal, install frontend dependencies and start the React app:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## How to Deploy
- **Frontend:** Deploy `frontend/` folder to Vercel.
- **Backend:** Deploy `backend/` folder to Render.

## Screenshots + Demo GIFs
Add UI demo images here.

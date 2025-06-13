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
1. Create a MongoDB Atlas database.
2. Copy `.env.example` files to `.env` in `backend/` and `frontend/` and fill values.
3. Install backend dependencies:
   ```bash
   cd backend && npm install
   npm run dev
   ```
4. Install frontend dependencies:
   ```bash
   cd frontend && npm install
   npm start
   ```

## How to Deploy
- **Frontend:** Deploy `frontend/` folder to Vercel.
- **Backend:** Deploy `backend/` folder to Render.

## Screenshots + Demo GIFs
Add UI demo images here.

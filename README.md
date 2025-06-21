# MyMovies

| Live Links | |
| --- | --- |
| **Frontend** | [https://3mtt-capstone-one.vercel.app](https://3mtt-capstone-one.vercel.app) |
| **Backend** | [https://threemtt-capstone.onrender.com](https://threemtt-capstone.onrender.com) |
| **License** | MIT |

![Demo](docs/demo.gif)

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

## API Endpoints
- `POST /auth/register` - create a new user  
- `POST /auth/login` - obtain JWT token  
- `GET /movies/search?query=` - search movies via TMDB  
- `GET /movies/trending` - trending movies  
- `GET /movies/recommendations` - personalized recommendations (requires auth)  
- `GET /users/profile` - get current user profile (requires auth)  
- `PUT /users/profile` - update the authenticated user's name and email  
- `POST /watchlist` - create a new watchlist (requires auth)  
- `PUT /watchlist/:id` - rename/update a watchlist (requires auth)  
- `DELETE /watchlist/:id` - delete a watchlist (requires auth)  
- `POST /watchlist/:id/add` - add movie to watchlist (requires auth)
- `GET /watchlist` - list all watchlists with movies (requires auth)
- `DELETE /watchlist/:id/movies/:movieId` - remove movie from watchlist
- `GET /watchlist/shared/:id` - view a shared watchlist
- `POST /reviews/:movieId` - create a movie review (requires auth)
- `GET /reviews/:movieId` - list reviews for a movie
- `POST /users/:id/follow` - follow another user (requires auth)
- `DELETE /users/:id/follow` - unfollow a user (requires auth)
- `GET /users/following/watchlists` - watchlists from followed users (requires auth)
- `GET /movies/:id` - movie details

## Deployment
1. Build the PWA assets:
   ```bash
   npm --prefix client run build
   ```
   The build output in `client/dist` includes the generated `manifest.webmanifest` and service worker.
2. Deploy the **frontend** to **Vercel** and set the `VITE_API_URL` environment variable so the React app can reach the Render backend.
3. Deploy the **backend** to **Render** with environment variables `MONGO_URI`, `JWT_SECRET`, and `TMDB_API_KEY` configured.
   Vercel will automatically run the build script when deploying.
4. Optional GitHub Actions workflows can be added to automate deployments.

## Documentation
Beginner friendly guides for running the project locally on Termux and Windows are available in [`docs/running_locally.md`](docs/running_locally.md).

Enjoy your new movie recommendation app!

# MyMovies

Discover and save your favourite films with this simple movie recommendation app. Built as a capstone project, it demonstrates a full stack setup using popular JavaScript tools. This app was created in fulfilment of the 3mtt Capstone Project requirements.

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38b2ac?style=for-the-badge&logo=tailwind-css)
![Termux](https://img.shields.io/badge/Termux-black?style=for-the-badge&logo=termux)

**Live Demo:** [Frontend](https://3mtt-capstone-one.vercel.app) • [Backend](https://threemtt-capstone.onrender.com)

---

## What this project does

* Register and log in with a secure account
* Browse, search and filter movies from the TMDB database
* Save favourites and create watchlists
* Rate and review titles
* Mobile friendly interface

The backend exposes a REST API using Express and stores data in MongoDB. The frontend is built with React and Tailwind CSS and communicates with the API using JWT authentication.
Stretch ideas include social features, improved recommendations, movie trailers via the YouTube API and turning the app into a PWA.

---

## How it was built

1. **Set up the backend** – created an Express server with routes for auth, movies, users and watchlists. Connected MongoDB with Mongoose and protected endpoints with JWT.
2. **Create the frontend** – bootstrapped a React project using Vite and styled it with Tailwind CSS and styled‑components. Added pages for browsing movies, viewing details and managing accounts.
3. **Fetch movie data** – integrated the TMDB API so users can search by title, genre or year and see full details including posters.
4. **Add user features** – implemented saving favourites, custom lists, ratings and reviews so each user can personalise their library.
5. **Make it responsive** – tested on mobile and desktop, ensuring the layout adapts well to smaller screens.
6. **Deploy** – hosted the frontend on Vercel and the backend on Render. Environment variables are used for all secrets.

---

## Getting started

Follow these steps to run the project locally.

```bash
# 1. Clone the repository
git clone https://github.com/Kanegraffiti/3mtt-Capstone.git
cd 3mtt-Capstone

# 2. Install backend then frontend dependencies
cd server && npm install
cd ../client && npm install

# 3. Create .env files for server and client
#    (see examples in each folder)

# 4. Start the development servers
npm --prefix server run dev     # backend on port 5000
npm --prefix client run dev -- --host  # frontend on port 3000
```

Open the printed Vite network URL in your browser to see the site. When you are ready for production, run `npm --prefix client run build` and deploy the `client/dist` folder to Vercel. The backend can be deployed to Render or another Node host.

---

## Mobile and Tablet UI Screenshots

Mobile
<img src="docs/screenshots/Mobile Collage.png" alt="Mobile" style="border-radius: 12px;" />

Tablet
<img src="docs/screenshots/Tablet Collage.png" alt="Tablet" style="border-radius: 12px;" />

---

## Documentation
Beginner friendly guides for running the project locally on Termux and Windows are available in [`docs/running_locally.md`](docs/running_locally.md).

## Student Lessons

Sharing the project with other learners surfaced a number of practical takeaways that go beyond the standard feature list:

### Building a full stack movie app from scratch
* **API hygiene matters early.** Planning consistent route names and response shapes saved hours when wiring the React hooks to the Express controllers. When we drifted from the plan, the TMDB payloads quickly became confusing to map.
* **Defensive state management reduces flicker.** Using local storage fallbacks and keeping `searching`/`hasMore` flags synchronised helped smooth out the UI when the network was slow or unavailable.

### Working as a student team
* **Short feedback loops beat big rewrites.** Pairing on movie-card layouts in 30 minute bursts allowed us to iterate quickly without derailing everyone’s schedule.
* **Documented rituals create predictability.** Writing down expectations for stand-ups, code reviews and deployment checklists meant that new collaborators could plug in faster.

### Growing beyond the capstone
* **Stretch ideas need discovery tasks.** Before rushing into social features or PWA work we now create research spikes to understand the data and UX implications.
* **Career storytelling starts now.** We captured our “aha!” moments in a dedicated lessons log so they can be retold during portfolio reviews or technical interviews.

You can read the extended write-up, including tooling tips, workflow templates and suggested follow-up exercises, in [`docs/student_lessons.md`](docs/student_lessons.md).

Enjoy exploring MyMovies and feel free to build on it or contribute!

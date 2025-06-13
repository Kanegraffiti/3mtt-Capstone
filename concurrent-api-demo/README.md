# Concurrent API Demo

This simple Express.js application demonstrates how Node.js handles multiple concurrent requests without blocking.

## Setup

```bash
npm install
node index.js
```

The server listens on **port 3000**.

## Available Routes

- `/ping` – Returns `{ status: "ok", timestamp }`.
- `/data` – Simulates an asynchronous database fetch with a short delay.
- `/heavy` – Simulates a slow operation with a 5-second delay.

## Testing Concurrency

Use [`autocannon`](https://github.com/mcollina/autocannon) or another load-testing tool to simulate concurrent requests. For example:

```bash
autocannon -c 100 -d 10 http://localhost:3000/data
```

This command fires 100 concurrent connections over 10 seconds against the `/data` endpoint. Since all operations are non-blocking, the server remains responsive even under heavy load.

This demonstrates Node.js scalability as the event loop efficiently processes each request without spawning new threads for every connection.

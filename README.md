# Express + PostgreSQL User API

## Overview
Simple Express.js API with PostgreSQL providing CRUD operations for a `users` table.

## Setup
```bash
npm install
node index.js
```

## Database Setup
Run the SQL file located at `sql/create_users_table.sql` to create the `users` table in your PostgreSQL database.

## API Endpoints
| Method | Route | Description |
|-------|------|-------------|
| GET | /users | Get all users |
| GET | /users/:id | Get user by ID |
| POST | /users | Add user |
| PUT | /users/:id | Update user |
| DELETE | /users/:id | Delete user |

## Example Request (cURL)
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","age":25}'
```

## Features
- Full CRUD using PostgreSQL
- Environment variables via `.env`
- Simple validation and error handling
- Ready to test with Postman or cURL

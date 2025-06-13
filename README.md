# Simple Express CRUD API

## Overview
This project provides a basic REST API built with **Express.js** using CommonJS modules. It demonstrates simple CRUD operations with an in-memory data store.

## Setup Instructions
```bash
npm install
node index.js
```
The server runs on port `3000` by default.

## API Documentation
### Endpoints
- **GET /**
  - Returns `Hello, World!`
- **GET /items**
  - Returns all items
- **GET /items/:id**
  - Returns an item by `id`
- **POST /items**
  - Adds a new item. Requires `name` and `description` in the JSON body.
- **PUT /items/:id**
  - Updates an existing item by `id`. Requires `name` and `description` in the body.
- **DELETE /items/:id**
  - Deletes an item by `id`

### Request Body Format
```json
{
  "name": "Item Name",
  "description": "Item description"
}
```

### Error Handling
- `400 Bad Request` – invalid or missing `name`/`description`
- `404 Not Found` – item does not exist
- `500 Internal Server Error` – unexpected error
All errors return JSON messages.

### Response Examples
#### POST /items
```
POST /items
Content-Type: application/json
{
  "name": "Book",
  "description": "A new novel"
}
```
Response:
```
Status: 201
{
  "id": 2,
  "name": "Book",
  "description": "A new novel"
}
```

## Testing Guide
Use Postman or `curl` to interact with the endpoints.
Example using `curl`:
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Book","description":"A new novel"}'
```
This should return the created item in JSON format.

<!-- Add screenshot of testing results here if desired -->

# API Test Cases

## Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123456"}'
```

## Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

Save the returned token for the following requests:

## Search Movies
```bash
curl "http://localhost:5000/api/movies/search?title=inception"
```

## Add Favorite
```bash
curl -X POST http://localhost:5000/api/movies/favorites \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"movieId":550}'
```

## View Favorites
```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:5000/api/movies/favorites
```

## Remove Favorite
```bash
curl -X DELETE http://localhost:5000/api/movies/favorites/<MOVIE_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

## Add to Watchlist
```bash
curl -X POST http://localhost:5000/api/movies/watchlist \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"movieId":550}'
```

## View Watchlist
```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:5000/api/movies/watchlist
```

## Remove Watchlist Item
```bash
curl -X DELETE http://localhost:5000/api/movies/watchlist/<MOVIE_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

## Add Review
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"movieId":550,"text":"Great movie!","rating":5}'
```

## Get Reviews for Movie
```bash
curl http://localhost:5000/api/reviews/movie/550
```

## Update Review
```bash
curl -X PUT http://localhost:5000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"text":"Updated text","rating":4}'
```

## Delete Review
```bash
curl -X DELETE http://localhost:5000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

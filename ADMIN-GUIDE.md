# Admin Movie Management Guide

## ✅ Features Added

### 1. **Duplicate Prevention**
- ✅ Movies with same title cannot be added
- ✅ Unique index on `title` field
- ✅ Clear error messages

### 2. **Complete Movie Fields**
All movies can include:
- Title (unique, required)
- Description (required)
- Poster URL (required)
- **Trailer URL** (videoUrl - YouTube embed link)
- **Duration** (in minutes)
- Genres (array)
- Language
- Cast (array)
- Director
- Price & Offer Price
- Release Date
- Rating & Reviews
- Featured status
- Published/Draft status

### 3. **Admin Endpoints**

#### Get All Movies
```
GET /api/admin/movies
```

#### Create New Movie
```
POST /api/admin/movies
Headers: Authorization: Bearer {token}
Body: {
  "title": "Movie Name",
  "description": "Movie description...",
  "posterUrl": "https://...",
  "videoUrl": "https://www.youtube.com/embed/xxxxx",
  "duration": 150,
  "genres": ["Action", "Thriller"],
  "language": "English",
  "cast": ["Actor 1", "Actor 2"],
  "director": "Director Name",
  "price": 300,
  "offerPrice": 250,
  "releaseDate": "2024-01-01",
  "featured": true
}
```

**Response if duplicate:**
```json
{
  "message": "Movie 'Movie Name' already exists in database"
}
```

#### Update Movie
```
PUT /api/admin/movies/:id
Body: { "field": "new value" }
```

#### Delete Movie
```
DELETE /api/admin/movies/:id
```

#### Toggle Featured
```
PATCH /api/admin/movies/:id/featured
```

### 4. **Category Management**

#### Get All Categories
```
GET /api/admin/categories
```

#### Create Category
```
POST /api/admin/categories
Body: {
  "name": "Horror",
  "description": "Scary movies"
}
```

#### Update/Delete Category
```
PUT /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

## Testing with Postman/Thunder Client

### 1. Login as Admin
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "admin@quickshow.com",
  "password": "Admin@1234"
}
```
Copy the `token` from response.

### 2. Add Movie
```
POST http://localhost:5000/api/admin/movies
Headers: {
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
Body: {
  "title": "Dune: Part Three",
  "description": "The epic conclusion...",
  "posterUrl": "https://image.tmdb.org/t/p/w500/example.jpg",
  "videoUrl": "https://www.youtube.com/embed/example",
  "duration": 165,
  "genres": ["Sci-Fi", "Adventure"],
  "language": "English",
  "cast": ["Timothée Chalamet", "Zendaya"],
  "director": "Denis Villeneuve",
  "price": 350,
  "offerPrice": 300,
  "releaseDate": "2026-03-20",
  "featured": true
}
```

### 3. Try Adding Duplicate (will fail)
```
POST http://localhost:5000/api/admin/movies
Body: { "title": "Dune: Part Three", ... }

Response: {
  "message": "Movie 'Dune: Part Three' already exists in database"
}
```

## Database Details

### Movies Collection
All movies have trailers (videoUrl field):
- **YouTube Embed Format**: `https://www.youtube.com/embed/VIDEO_ID`
- Example: `https://www.youtube.com/embed/YoHD9XEInc0`

### Seeded Movies
Run `node server\completeSetup.js` to add:
- 24 movies with trailers
- Hollywood: Inception, Interstellar, Oppenheimer, etc.
- Bollywood: Jawan, Pathaan, Animal, etc.
- South Indian: RRR, KGF 2, Pushpa, etc.

## Frontend Integration

### Admin Panel Routes (to be created)
- `/admin/movies` - List all movies
- `/admin/movies/new` - Add new movie
- `/admin/movies/:id/edit` - Edit movie
- `/admin/categories` - Manage categories

All ready for you to build the UI!

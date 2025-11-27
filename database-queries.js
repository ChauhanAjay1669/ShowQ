// MongoDB Direct Insert Queries
// Run these in mongosh or MongoDB Compass

// Switch to quickshow database
use quickshow

// ============================================
// 1. INSERT CATEGORIES
// ============================================
db.categories.insertMany([
    { name: "Action", description: "High-octane action movies" },
    { name: "Comedy", description: "Laugh-out-loud comedies" },
    { name: "Drama", description: "Emotional drama films" },
    { name: "Sci-Fi", description: "Science fiction adventures" },
    { name: "Horror", description: "Spine-chilling horror movies" },
    { name: "Romance", description: "Romantic stories" },
    { name: "Thriller", description: "Edge-of-your-seat thrillers" },
    { name: "Animation", description: "Animated films for all ages" },
    { name: "Bollywood", description: "Hindi cinema" },
    { name: "Hollywood", description: "English cinema" }
])

// ============================================
// 2. INSERT MOVIES
// ============================================
db.movies.insertMany([
    // Hollywood Movies
    {
        title: "Inception",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea",
        posterUrl: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
        rating: 4.8,
        price: 250,
        offerPrice: 200,
        language: "English",
        genres: ["Sci-Fi", "Thriller"],
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Tom Hardy", "Ellen Page"],
        releaseDate: new Date("2010-07-16"),
        videoUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
        featured: true,
        status: "published"
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: 4.9,
        price: 250,
        offerPrice: 200,
        language: "English",
        genres: ["Action", "Thriller"],
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        releaseDate: new Date("2008-07-18"),
        videoUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
        featured: true,
        status: "published"
    },
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival",
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        rating: 4.7,
        price: 250,
        offerPrice: 200,
        language: "English",
        genres: ["Sci-Fi", "Drama"],
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        releaseDate: new Date("2014-11-07"),
        videoUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
        featured: true,
        status: "published"
    },
    {
        title: "Avatar: The Way of Water",
        description: "Jake Sully and Neytiri have formed a family and are doing everything to stay together",
        posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        rating: 4.6,
        price: 300,
        offerPrice: 250,
        language: "English",
        genres: ["Sci-Fi", "Action"],
        director: "James Cameron",
        cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
        releaseDate: new Date("2022-12-16"),
        videoUrl: "https://www.youtube.com/embed/d9MyW72ELq0",
        featured: true,
        status: "published"
    },
    {
        title: "Oppenheimer",
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb",
        posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        rating: 4.8,
        price: 300,
        offerPrice: 250,
        language: "English",
        genres: ["Drama", "Thriller"],
        director: "Christopher Nolan",
        cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
        releaseDate: new Date("2023-07-21"),
        videoUrl: "https://www.youtube.com/embed/uYPbbksJxIg",
        featured: true,
        status: "published"
    },

    // Bollywood Movies
    {
        title: "Jawan",
        description: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in society",
        posterUrl: "https://image.tmdb.org/t/p/w500/v4B2kpRFawRd13FRq9Y6vMUvYJB.jpg",
        rating: 4.5,
        price: 200,
        offerPrice: 150,
        language: "Hindi",
        genres: ["Action", "Thriller"],
        director: "Atlee",
        cast: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"],
        releaseDate: new Date("2023-09-07"),
        videoUrl: "https://www.youtube.com/embed/VlvMz25V6OM",
        featured: true,
        status: "published"
    },
    {
        title: "Pathaan",
        description: "An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland",
        posterUrl: "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
        rating: 4.4,
        price: 200,
        offerPrice: 150,
        language: "Hindi",
        genres: ["Action", "Thriller"],
        director: "Siddharth Anand",
        cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
        releaseDate: new Date("2023-01-25"),
        videoUrl: "https://www.youtube.com/embed/vqu4z34wENw",
        featured: true,
        status: "published"
    },
    {
        title: "Animal",
        description: "This is the story of a son whose love for his father knows no bounds",
        posterUrl: "https://image.tmdb.org/t/p/w500/2fS9cpar9rzxixwnRptg4bGmIym.jpg",
        rating: 4.3,
        price: 200,
        offerPrice: 150,
        language: "Hindi",
        genres: ["Action", "Drama"],
        director: "Sandeep Reddy Vanga",
        cast: ["Ranbir Kapoor", "Rashmika Mandanna", "Anil Kapoor"],
        releaseDate: new Date("2023-12-01"),
        videoUrl: "https://www.youtube.com/embed/XlVFA3dort4",
        featured: false,
        status: "published"
    },

    // South Indian Movies
    {
        title: "RRR",
        description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country",
        posterUrl: "https://image.tmdb.org/t/p/w500/wE0I6efAW4cDDmZQWtwZMOW44EJ.jpg",
        rating: 4.9,
        price: 200,
        offerPrice: 150,
        language: "Telugu",
        genres: ["Action", "Drama"],
        director: "S.S. Rajamouli",
        cast: ["Ram Charan", "Jr NTR", "Alia Bhatt"],
        releaseDate: new Date("2022-03-25"),
        videoUrl: "https://www.youtube.com/embed/GY4CDSaGk-Q",
        featured: true,
        status: "published"
    },
    {
        title: "KGF: Chapter 2",
        description: "The blood-soaked land of Kolar Gold Fields has a new overlord now - Rocky",
        posterUrl: "https://image.tmdb.org/t/p/w500/xfDTUJMvPK7DcRbRMj5eOYB9vFw.jpg",
        rating: 4.6,
        price: 200,
        offerPrice: 150,
        language: "Kannada",
        genres: ["Action", "Drama"],
        director: "Prashanth Neel",
        cast: ["Yash", "Sanjay Dutt", "Raveena Tandon"],
        releaseDate: new Date("2022-04-14"),
        videoUrl: "https://www.youtube.com/embed/JKa05nyUmuQ",
        featured: true,
        status: "published"
    },
    {
        title: "Pushpa: The Rise",
        description: "Violence erupts between red sandalwood smugglers and the police",
        posterUrl: "https://image.tmdb.org/t/p/w500/qVdzHf0jJwS7d0ZRKD5xPuLJo0J.jpg",
        rating: 4.5,
        price: 200,
        offerPrice: 150,
        language: "Telugu",
        genres: ["Action", "Thriller"],
        director: "Sukumar",
        cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"],
        releaseDate: new Date("2021-12-17"),
        videoUrl: "https://www.youtube.com/embed/pKctjlxbFDQ",
        featured: true,
        status: "published"
    },
    {
        title: "Vikram",
        description: "Members of a black ops team must track and eliminate a gang of masked murderers",
        posterUrl: "https://image.tmdb.org/t/p/w500/oOce9hClMbII14WLYneKNPrTbTT.jpg",
        rating: 4.7,
        price: 200,
        offerPrice: 150,
        language: "Tamil",
        genres: ["Action", "Thriller"],
        director: "Lokesh Kanagaraj",
        cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil"],
        releaseDate: new Date("2022-06-03"),
        videoUrl: "https://www.youtube.com/embed/OKBMCL-frPU",
        featured: false,
        status: "published"
    }
])

// ============================================
// 3. CREATE ADMIN USER
// ============================================
// Note: Password is hashed with bcrypt
// Plain password: Admin@1234
db.users.insertOne({
    name: "Admin",
    email: "admin@quickshow.com",
    password: "$2a$10$YourHashedPasswordHere",  // You need to hash this
    role: "admin",
    blocked: false,
    createdAt: new Date(),
    updatedAt: new Date()
})

// ============================================
// 4. CREATE TEST USER
// ============================================
// Plain password: Test@1234
db.users.insertOne({
    name: "Test User",
    email: "test@quickshow.com",
    password: "$2a$10$YourHashedPasswordHere",  // You need to hash this
    role: "user",
    blocked: false,
    createdAt: new Date(),
    updatedAt: new Date()
})

// ============================================
// 5. VERIFY DATA
// ============================================
print("Categories count:", db.categories.countDocuments())
print("Movies count:", db.movies.countDocuments())
print("Users count:", db.users.countDocuments())

// ============================================
// 6. VIEW SAMPLE DATA
// ============================================
print("\n=== Sample Movie ===")
db.movies.findOne()

print("\n=== All Categories ===")
db.categories.find()

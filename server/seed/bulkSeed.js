const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('../models/Movie');
const Category = require('../models/Category');

const path = require('path');
// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const categories = [
    { name: "Action", description: "Action movies" },
    { name: "Comedy", description: "Comedy movies" },
    { name: "Drama", description: "Drama movies" },
    { name: "Sci-Fi", description: "Science Fiction movies" },
    { name: "Horror", description: "Horror movies" },
    { name: "Romance", description: "Romance movies" },
    { name: "Thriller", description: "Thriller movies" },
    { name: "Bollywood", description: "Indian Hindi movies" },
    { name: "Hollywood", description: "English movies" },
    { name: "South Indian", description: "South Indian movies" }
];

const movieData = [
    // Hollywood
    { title: "Inception", genre: "Sci-Fi", lang: "English", director: "Christopher Nolan" },
    { title: "Interstellar", genre: "Sci-Fi", lang: "English", director: "Christopher Nolan" },
    { title: "The Dark Knight", genre: "Action", lang: "English", director: "Christopher Nolan" },
    { title: "Avatar: The Way of Water", genre: "Sci-Fi", lang: "English", director: "James Cameron" },
    { title: "Dune: Part Two", genre: "Sci-Fi", lang: "English", director: "Denis Villeneuve" },
    { title: "Oppenheimer", genre: "Drama", lang: "English", director: "Christopher Nolan" },
    { title: "Barbie", genre: "Comedy", lang: "English", director: "Greta Gerwig" },
    { title: "Spider-Man: Across the Spider-Verse", genre: "Animation", lang: "English", director: "Joaquim Dos Santos" },
    { title: "Top Gun: Maverick", genre: "Action", lang: "English", director: "Joseph Kosinski" },
    { title: "The Batman", genre: "Action", lang: "English", director: "Matt Reeves" },

    // Bollywood
    { title: "Jawan", genre: "Action", lang: "Hindi", director: "Atlee" },
    { title: "Pathaan", genre: "Action", lang: "Hindi", director: "Siddharth Anand" },
    { title: "Animal", genre: "Action", lang: "Hindi", director: "Sandeep Reddy Vanga" },
    { title: "Gadar 2", genre: "Action", lang: "Hindi", director: "Anil Sharma" },
    { title: "Tiger 3", genre: "Action", lang: "Hindi", director: "Maneesh Sharma" },
    { title: "Rocky Aur Rani Kii Prem Kahaani", genre: "Romance", lang: "Hindi", director: "Karan Johar" },
    { title: "Dunki", genre: "Drama", lang: "Hindi", director: "Rajkumar Hirani" },
    { title: "Brahmastra", genre: "Fantasy", lang: "Hindi", director: "Ayan Mukerji" },
    { title: "War", genre: "Action", lang: "Hindi", director: "Siddharth Anand" },
    { title: "Bajrangi Bhaijaan", genre: "Drama", lang: "Hindi", director: "Kabir Khan" },

    // South Indian
    { title: "RRR", genre: "Action", lang: "Telugu", director: "S.S. Rajamouli" },
    { title: "KGF: Chapter 2", genre: "Action", lang: "Kannada", director: "Prashanth Neel" },
    { title: "Pushpa: The Rise", genre: "Action", lang: "Telugu", director: "Sukumar" },
    { title: "Baahubali 2: The Conclusion", genre: "Action", lang: "Telugu", director: "S.S. Rajamouli" },
    { title: "Kantara", genre: "Thriller", lang: "Kannada", director: "Rishab Shetty" },
    { title: "Vikram", genre: "Action", lang: "Tamil", director: "Lokesh Kanagaraj" },
    { title: "Jailer", genre: "Action", lang: "Tamil", director: "Nelson Dilipkumar" },
    { title: "Leo", genre: "Action", lang: "Tamil", director: "Lokesh Kanagaraj" },
    { title: "Salaar", genre: "Action", lang: "Telugu", director: "Prashanth Neel" },
    { title: "Ponniyin Selvan: I", genre: "Drama", lang: "Tamil", director: "Mani Ratnam" }
];

const generateMovies = (count) => {
    const generated = [];
    for (let i = 0; i < count; i++) {
        const base = movieData[i % movieData.length];
        const suffix = Math.floor(i / movieData.length) + 1;
        generated.push({
            title: suffix > 1 ? `${base.title} ${suffix}` : base.title,
            description: `This is a description for ${base.title}. A great movie to watch!`,
            posterUrl: `https://source.unsplash.com/random/300x450?movie,${base.genre.toLowerCase()}&sig=${i}`,
            rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
            price: Math.floor(Math.random() * 200) + 100,
            offerPrice: Math.floor(Math.random() * 100) + 50,
            language: base.lang,
            genres: [base.genre, i % 2 === 0 ? "Action" : "Drama"],
            director: base.director,
            cast: ["Actor A", "Actor B", "Actor C"],
            releaseDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
            duration: Math.floor(Math.random() * 60) + 90,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Sample trailer URL
        });
    }
    return generated;
};

const seedDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quickshow';
        await mongoose.connect(mongoUri);
        console.log('📦 Connected to MongoDB');

        await Movie.deleteMany({});
        await Category.deleteMany({});
        console.log('🧹 Cleared existing data');

        await Category.insertMany(categories);
        console.log('📁 Categories created');

        const moviesToInsert = generateMovies(220); // Generate 220 movies
        await Movie.insertMany(moviesToInsert);
        console.log(`🎬 Inserted ${moviesToInsert.length} movies`);

        console.log('✅ Bulk seed completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();

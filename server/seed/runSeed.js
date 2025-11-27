const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('../models/Movie');
const Category = require('../models/Category');

// Load env vars
dotenv.config({ path: '../.env' });

const movies = [
    {
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        posterUrl: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        rating: 4.8,
        price: 299,
        offerPrice: 199,
        language: "English",
        genres: ["Sci-Fi", "Action"],
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
        releaseDate: new Date("2010-07-16"),
        duration: 148
    },
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        posterUrl: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        rating: 4.9,
        price: 299,
        offerPrice: 249,
        language: "English",
        genres: ["Sci-Fi", "Adventure"],
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        releaseDate: new Date("2014-11-07"),
        duration: 169
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        posterUrl: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: 5.0,
        price: 249,
        offerPrice: 199,
        language: "English",
        genres: ["Action", "Crime"],
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        releaseDate: new Date("2008-07-18"),
        duration: 152
    },
    {
        title: "Avatar: The Way of Water",
        description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
        posterUrl: "https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        rating: 4.7,
        price: 399,
        offerPrice: 299,
        language: "English",
        genres: ["Sci-Fi", "Action"],
        director: "James Cameron",
        cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
        releaseDate: new Date("2022-12-16"),
        duration: 192
    },
    {
        title: "Dune: Part Two",
        description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
        posterUrl: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        rating: 4.9,
        price: 349,
        offerPrice: 299,
        language: "English",
        genres: ["Sci-Fi", "Adventure"],
        director: "Denis Villeneuve",
        cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
        releaseDate: new Date("2024-03-01"),
        duration: 166
    },
    {
        title: "Oppenheimer",
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        posterUrl: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        rating: 4.8,
        price: 299,
        offerPrice: 249,
        language: "English",
        genres: ["Drama", "History"],
        director: "Christopher Nolan",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
        releaseDate: new Date("2023-07-21"),
        duration: 180
    }
];

const categories = [
    { name: "Action", description: "Action movies" },
    { name: "Comedy", description: "Comedy movies" },
    { name: "Drama", description: "Drama movies" },
    { name: "Sci-Fi", description: "Science Fiction movies" },
    { name: "Horror", description: "Horror movies" }
];

const seedDB = async () => {
    try {
        // Connect to DB
        // Use hardcoded URI if env var is missing (fallback)
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/quickshow';
        await mongoose.connect(mongoUri);
        console.log('📦 Connected to MongoDB');

        // Clear existing data
        await Movie.deleteMany({});
        await Category.deleteMany({});
        console.log('🧹 Cleared existing data');

        // Insert new data
        await Movie.insertMany(movies);
        await Category.insertMany(categories);
        console.log('✅ Database seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();

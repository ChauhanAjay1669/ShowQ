const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const Movie = require('./models/Movie');
const Category = require('./models/Category');

const categories = [
    { name: "Action", description: "High-octane action movies" },
    { name: "Comedy", description: "Laugh-out-loud comedies" },
    { name: "Drama", description: "Emotional drama films" },
    { name: "Sci-Fi", description: "Science fiction adventures" },
    { name: "Horror", description: "Spine-chilling horror movies" },
    { name: "Romance", description: "Romantic stories" },
    { name: "Thriller", description: "Edge-of-your-seat thrillers" },
    { name: "Bollywood", description: "Hindi cinema" },
    { name: "Hollywood", description: "English cinema" },
    { name: "South Indian", description: "Tamil, Telugu, Kannada films" }
];

const movies = [
    // Hollywood Blockbusters
    { title: "Inception", description: "A thief who steals corporate secrets through dream-sharing technology", posterUrl: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg", rating: 4.8, price: 250, offerPrice: 200, language: "English", genres: ["Sci-Fi", "Thriller"], director: "Christopher Nolan", cast: ["Leonardo DiCaprio", "Tom Hardy"], releaseDate: new Date("2010-07-16"), videoUrl: "https://www.youtube.com/embed/YoHD9XEInc0" },

    { title: "The Dark Knight", description: "Batman faces the Joker in this thrilling sequel", posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 4.9, price: 250, offerPrice: 200, language: "English", genres: ["Action", "Thriller"], director: "Christopher Nolan", cast: ["Christian Bale", "Heath Ledger"], releaseDate: new Date("2008-07-18"), videoUrl: "https://www.youtube.com/embed/EXeTwQWrcwY" },

    { title: "Interstellar", description: "A team of explorers travel through a wormhole in space", posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", rating: 4.7, price: 250, offerPrice: 200, language: "English", genres: ["Sci-Fi", "Drama"], director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway"], releaseDate: new Date("2014-11-07"), videoUrl: "https://www.youtube.com/embed/zSWdZVtXT7E" },

    { title: "Avatar: The Way of Water", description: "Jake Sully and Neytiri's family faces new threats", posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", rating: 4.6, price: 300, offerPrice: 250, language: "English", genres: ["Sci-Fi", "Action"], director: "James Cameron", cast: ["Sam Worthington", "Zoe Saldana"], releaseDate: new Date("2022-12-16"), videoUrl: "https://www.youtube.com/embed/d9MyW72ELq0" },

    { title: "Oppenheimer", description: "The story of J. Robert Oppenheimer and the atomic bomb", posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", rating: 4.8, price: 300, offerPrice: 250, language: "English", genres: ["Drama", "Thriller"], director: "Christopher Nolan", cast: ["Cillian Murphy", "Emily Blunt"], releaseDate: new Date("2023-07-21"), videoUrl: "https://www.youtube.com/embed/uYPbbksJxIg" },

    // Bollywood Hits
    { title: "Jawan", description: "A high-octane action thriller starring Shah Rukh Khan", posterUrl: "https://image.tmdb.org/t/p/w500/v4B2kpRFawRd13FRq9Y6vMUvYJB.jpg", rating: 4.5, price: 200, offerPrice: 150, language: "Hindi", genres: ["Action", "Thriller"], director: "Atlee", cast: ["Shah Rukh Khan", "Nayanthara"], releaseDate: new Date("2023-09-07"), videoUrl: "https://www.youtube.com/embed/VlvMz25V6OM" },

    { title: "Pathaan", description: "An Indian spy takes on a mercenary leader", posterUrl: "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg", rating: 4.4, price: 200, offerPrice: 150, language: "Hindi", genres: ["Action", "Thriller"], director: "Siddharth Anand", cast: ["Shah Rukh Khan", "Deepika Padukone"], releaseDate: new Date("2023-01-25"), videoUrl: "https://www.youtube.com/embed/vqu4z34wENw" },

    { title: "Animal", description: "A son's love for his father takes a dark turn", posterUrl: "https://image.tmdb.org/t/p/w500/2fS9cpar9rzxixwnRptg4bGmIym.jpg", rating: 4.3, price: 200, offerPrice: 150, language: "Hindi", genres: ["Action", "Drama"], director: "Sandeep Reddy Vanga", cast: ["Ranbir Kapoor", "Rashmika Mandanna"], releaseDate: new Date("2023-12-01"), videoUrl: "https://www.youtube.com/embed/XlVFA3dort4" },

    { title: "Dunki", description: "A heartwarming story about illegal immigration", posterUrl: "https://image.tmdb.org/t/p/w500/pWgfb8pqZxCsgPcQJYpXWG4kf6a.jpg", rating: 4.2, price: 200, offerPrice: 150, language: "Hindi", genres: ["Drama", "Comedy"], director: "Rajkumar Hirani", cast: ["Shah Rukh Khan", "Taapsee Pannu"], releaseDate: new Date("2023-12-21"), videoUrl: "https://www.youtube.com/embed/LKKoRUPrsS4" },

    // South Indian Cinema
    { title: "RRR", description: "Epic period action drama about two revolutionaries", posterUrl: "https://image.tmdb.org/t/p/w500/wE0I6efAW4cDDmZQWtwZMOW44EJ.jpg", rating: 4.9, price: 200, offerPrice: 150, language: "Telugu", genres: ["Action", "Drama"], director: "S.S. Rajamouli", cast: ["Ram Charan", "Jr NTR"], releaseDate: new Date("2022-03-25"), videoUrl: "https://www.youtube.com/embed/GY4CDSaGk-Q" },

    { title: "KGF: Chapter 2", description: "Rocky continues his journey to becoming the king of Kolar Gold Fields", posterUrl: "https://image.tmdb.org/t/p/w500/xfDTUJMvPK7DcRbRMj5eOYB9vFw.jpg", rating: 4.6, price: 200, offerPrice: 150, language: "Kannada", genres: ["Action", "Drama"], director: "Prashanth Neel", cast: ["Yash", "Sanjay Dutt"], releaseDate: new Date("2022-04-14"), videoUrl: "https://www.youtube.com/embed/JKa05nyUmuQ" },

    { title: "Pushpa: The Rise", description: "A laborer rises through the ranks of a red sandalwood smuggling syndicate", posterUrl: "https://image.tmdb.org/t/p/w500/qVdzHf0jJwS7d0ZRKD5xPuLJo0J.jpg", rating: 4.5, price: 200, offerPrice: 150, language: "Telugu", genres: ["Action", "Thriller"], director: "Sukumar", cast: ["Allu Arjun", "Rashmika Mandanna"], releaseDate: new Date("2021-12-17"), videoUrl: "https://www.youtube.com/embed/pKctjlxbFDQ" },

    { title: "Vikram", description: "Members of a black ops team must track and eliminate a gang of masked murderers", posterUrl: "https://image.tmdb.org/t/p/w500/oOce9hClMbII14WLYneKNPrTbTT.jpg", rating: 4.7, price: 200, offerPrice: 150, language: "Tamil", genres: ["Action", "Thriller"], director: "Lokesh Kanagaraj", cast: ["Kamal Haasan", "Vijay Sethupathi"], releaseDate: new Date("2022-06-03"), videoUrl: "https://www.youtube.com/embed/OKBMCL-frPU" },

    { title: "Jailer", description: "A retired jailer goes on a manhunt to find his son's killers", posterUrl: "https://image.tmdb.org/t/p/w500/1zJN3YPmmZaUqCaOMUKwY7ksw21.jpg", rating: 4.4, price: 200, offerPrice: 150, language: "Tamil", genres: ["Action", "Comedy"], director: "Nelson Dilipkumar", cast: ["Rajinikanth", "Mohanlal"], releaseDate: new Date("2023-08-10"), videoUrl: "https://www.youtube.com/embed/E3UTVGNllFk" }
];

const seedDatabase = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quickshow';
        console.log('🔌 Connecting to MongoDB:', mongoUri);

        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🧹 Clearing existing data...');
        await Movie.deleteMany({});
        await Category.deleteMany({});
        console.log('✅ Data cleared');

        // Insert categories
        console.log('📁 Inserting categories...');
        await Category.insertMany(categories);
        console.log(`✅ Inserted ${categories.length} categories`);

        // Insert movies
        console.log('🎬 Inserting movies...');
        await Movie.insertMany(movies);
        console.log(`✅ Inserted ${movies.length} movies`);

        console.log('\n🎉 Database seeded successfully!');
        console.log(`\n📊 Summary:`);
        console.log(`   - Categories: ${categories.length}`);
        console.log(`   - Movies: ${movies.length}`);
        console.log('\n✅ You can now start your server and test signup/signin!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
};

seedDatabase();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const Movie = require('./models/Movie');
const Category = require('./models/Category');
const User = require('./models/User');

const categories = [
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
];

const movies = [
    // Hollywood Blockbusters
    { title: "Inception", description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea", posterUrl: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg", rating: 4.8, price: 250, offerPrice: 200, language: "English", genres: ["Sci-Fi", "Thriller"], director: "Christopher Nolan", cast: ["Leonardo DiCaprio", "Tom Hardy", "Ellen Page"], releaseDate: new Date("2010-07-16"), videoUrl: "https://www.youtube.com/embed/YoHD9XEInc0", featured: true },

    { title: "The Dark Knight", description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests", posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 4.9, price: 250, offerPrice: 200, language: "English", genres: ["Action", "Thriller"], director: "Christopher Nolan", cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"], releaseDate: new Date("2008-07-18"), videoUrl: "https://www.youtube.com/embed/EXeTwQWrcwY", featured: true },

    { title: "Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival", posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", rating: 4.7, price: 250, offerPrice: 200, language: "English", genres: ["Sci-Fi", "Drama"], director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"], releaseDate: new Date("2014-11-07"), videoUrl: "https://www.youtube.com/embed/zSWdZVtXT7E", featured: true },

    { title: "Avatar: The Way of Water", description: "Jake Sully and Neytiri have formed a family and are doing everything to stay together", posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", rating: 4.6, price: 300, offerPrice: 250, language: "English", genres: ["Sci-Fi", "Action"], director: "James Cameron", cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], releaseDate: new Date("2022-12-16"), videoUrl: "https://www.youtube.com/embed/d9MyW72ELq0", featured: true },

    { title: "Oppenheimer", description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb", posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", rating: 4.8, price: 300, offerPrice: 250, language: "English", genres: ["Drama", "Thriller"], director: "Christopher Nolan", cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."], releaseDate: new Date("2023-07-21"), videoUrl: "https://www.youtube.com/embed/uYPbbksJxIg", featured: true },

    { title: "Dune: Part Two", description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family", posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", rating: 4.7, price: 300, offerPrice: 250, language: "English", genres: ["Sci-Fi", "Action"], director: "Denis Villeneuve", cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"], releaseDate: new Date("2024-02-28"), videoUrl: "https://www.youtube.com/embed/Way9Dexny3w", featured: false },

    { title: "The Batman", description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate", posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", rating: 4.5, price: 250, offerPrice: 200, language: "English", genres: ["Action", "Thriller"], director: "Matt Reeves", cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"], releaseDate: new Date("2022-03-04"), videoUrl: "https://www.youtube.com/embed/mqqft2x_Aa4", featured: false },

    { title: "Top Gun: Maverick", description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator", posterUrl: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg", rating: 4.6, price: 250, offerPrice: 200, language: "English", genres: ["Action", "Drama"], director: "Joseph Kosinski", cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"], releaseDate: new Date("2022-05-27"), videoUrl: "https://www.youtube.com/embed/giXco2jaZ_4", featured: false },

    // Bollywood Hits
    { title: "Jawan", description: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in society", posterUrl: "https://image.tmdb.org/t/p/w500/v4B2kpRFawRd13FRq9Y6vMUvYJB.jpg", rating: 4.5, price: 200, offerPrice: 150, language: "Hindi", genres: ["Action", "Thriller"], director: "Atlee", cast: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"], releaseDate: new Date("2023-09-07"), videoUrl: "https://www.youtube.com/embed/VlvMz25V6OM", featured: true },

    { title: "Pathaan", description: "An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland", posterUrl: "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg", rating: 4.4, price: 200, offerPrice: 150, language: "Hindi", genres: ["Action", "Thriller"], director: "Siddharth Anand", cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"], releaseDate: new Date("2023-01-25"), videoUrl: "https://www.youtube.com/embed/vqu4z34wENw", featured: true },

    { title: "Animal", description: "This is the story of a son whose love for his father knows no bounds", posterUrl: "https://image.tmdb.org/t/p/w500/2fS9cpar9rzxixwnRptg4bGmIym.jpg", rating: 4.3, price: 200, offerPrice: 150, language: "Hindi", genres: ["Action", "Drama"], director: "Sandeep Reddy Vanga", cast: ["Ranbir Kapoor", "Rashmika Mandanna", "Anil Kapoor"], releaseDate: new Date("2023-12-01"), videoUrl: "https://www.youtube.com/embed/XlVFA3dort4", featured: false },

    { title: "Dunki", description: "A hilarious story of a group of friends desperate to immigrate abroad", posterUrl: "https://image.tmdb.org/t/p/w500/pWgfb8pqZxCsgPcQJYpXWG4kf6a.jpg", rating: 4.2, price: 200, offerPrice: 150, language: "Hindi", genres: ["Drama", "Comedy"], director: "Rajkumar Hirani", cast: ["Shah Rukh Khan", "Taapsee Pannu", "Vicky Kaushal"], releaseDate: new Date("2023-12-21"), videoUrl: "https://www.youtube.com/embed/LKKoRUPrsS4", featured: false },

    { title: "Tiger 3", description: "Tiger and Zoya are back - to save the country and their family", posterUrl: "https://image.tmdb.org/t/p/w500/nGZOhRE8OuyKcSNEpbPqrufh9LW.jpg", rating: 4.1, price: 200, offerPrice: 150, language: "Hindi", genres: ["Action", "Thriller"], director: "Maneesh Sharma", cast: ["Salman Khan", "Katrina Kaif", "Emraan Hashmi"], releaseDate: new Date("2023-11-12"), videoUrl: "https://www.youtube.com/embed/BE_J-smLTSM", featured: false },

    { title: "Rocky Aur Rani Kii Prem Kahaani", description: "Magnifies the power of unconditional love and family values", posterUrl: "https://image.tmdb.org/t/p/w500/jJuJPZOPZCYucME8v5Qf7pBtPqc.jpg", rating: 4.0, price: 180, offerPrice: 140, language: "Hindi", genres: ["Romance", "Drama"], director: "Karan Johar", cast: ["Ranveer Singh", "Alia Bhatt", "Dharmendra"], releaseDate: new Date("2023-07-28"), videoUrl: "https://www.youtube.com/embed/uiqAabulq08", featured: false },

    // South Indian Cinema
    { title: "RRR", description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country", posterUrl: "https://image.tmdb.org/t/p/w500/wE0I6efAW4cDDmZQWtwZMOW44EJ.jpg", rating: 4.9, price: 200, offerPrice: 150, language: "Telugu", genres: ["Action", "Drama"], director: "S.S. Rajamouli", cast: ["Ram Charan", "Jr NTR", "Alia Bhatt"], releaseDate: new Date("2022-03-25"), videoUrl: "https://www.youtube.com/embed/GY4CDSaGk-Q", featured: true },

    { title: "KGF: Chapter 2", description: "The blood-soaked land of Kolar Gold Fields has a new overlord now - Rocky, whose name strikes fear in the hearts of his foes", posterUrl: "https://image.tmdb.org/t/p/w500/xfDTUJMvPK7DcRbRMj5eOYB9vFw.jpg", rating: 4.6, price: 200, offerPrice: 150, language: "Kannada", genres: ["Action", "Drama"], director: "Prashanth Neel", cast: ["Yash", "Sanjay Dutt", "Raveena Tandon"], releaseDate: new Date("2022-04-14"), videoUrl: "https://www.youtube.com/embed/JKa05nyUmuQ", featured: true },

    { title: "Pushpa: The Rise", description: "Violence erupts between red sandalwood smugglers and the police charged with bringing down their organization", posterUrl: "https://image.tmdb.org/t/p/w500/qVdzHf0jJwS7d0ZRKD5xPuLJo0J.jpg", rating: 4.5, price: 200, offerPrice: 150, language: "Telugu", genres: ["Action", "Thriller"], director: "Sukumar", cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"], releaseDate: new Date("2021-12-17"), videoUrl: "https://www.youtube.com/embed/pKctjlxbFDQ", featured: true },

    { title: "Vikram", description: "Members of a black ops team must track and eliminate a gang of masked murderers", posterUrl: "https://image.tmdb.org/t/p/w500/oOce9hClMbII14WLYneKNPrTbTT.jpg", rating: 4.7, price: 200, offerPrice: 150, language: "Tamil", genres: ["Action", "Thriller"], director: "Lokesh Kanagaraj", cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil"], releaseDate: new Date("2022-06-03"), videoUrl: "https://www.youtube.com/embed/OKBMCL-frPU", featured: false },

    { title: "Jailer", description: "A retired jailer goes on a manhunt to find his son's killers", posterUrl: "https://image.tmdb.org/t/p/w500/1zJN3YPmmZaUqCaOMUKwY7ksw21.jpg", rating: 4.4, price: 200, offerPrice: 150, language: "Tamil", genres: ["Action", "Comedy"], director: "Nelson Dilipkumar", cast: ["Rajinikanth", "Mohanlal", "Shiva Rajkumar"], releaseDate: new Date("2023-08-10"), videoUrl: "https://www.youtube.com/embed/E3UTVGNllFk", featured: false },

    { title: "Leo", description: "A mild-mannered cafe owner's life turns upside down when he has to protect his family from ruthless gangsters", posterUrl: "https://image.tmdb.org/t/p/w500/r_rLDvE6KgcxEEJfWtJSw2nnQeo.jpg", rating: 4.3, price: 200, offerPrice: 150, language: "Tamil", genres: ["Action", "Thriller"], director: "Lokesh Kanagaraj", cast: ["Vijay", "Sanjay Dutt", "Trisha Krishnan"], releaseDate: new Date("2023-10-19"), videoUrl: "https://www.youtube.com/embed/Po3jStA673E", featured: false },

    { title: "Salaar", description: "Set in the fictional dystopian city-state of Khansaar, a friendship between two men is tested", posterUrl: "https://image.tmdb.org/t/p/w500/vYdXM9TTVG0qdEg60xzxPv7rZhj.jpg", rating: 4.5, price: 220, offerPrice: 170, language: "Telugu", genres: ["Action", "Thriller"], director: "Prashanth Neel", cast: ["Prabhas", "Prithviraj Sukumaran", "Shruti Haasan"], releaseDate: new Date("2023-12-22"), videoUrl: "https://www.youtube.com/embed/azqmxiHhx0Q", featured: false },

    { title: "Kantara", description: "When greed paves the way for betrayal, scheming and murder, a young tribal reluctantly dons the traditions of his ancestors", posterUrl: "https://image.tmdb.org/t/p/w500/8FNyDjqgWdYgSwVTnT1KPqPr1vY.jpg", rating: 4.6, price: 180, offerPrice: 140, language: "Kannada", genres: ["Thriller", "Drama"], director: "Rishab Shetty", cast: ["Rishab Shetty", "Sapthami Gowda", "Kishore"], releaseDate: new Date("2022-09-30"), videoUrl: "https://www.youtube.com/embed/8mrVmf239GU", featured: false },

    { title: "Ponniyin Selvan: I", description: "Vandiyathevan crosses the Chola land to deliver a message from the Crown Prince Aditha Karikalan", posterUrl: "https://image.tmdb.org/t/p/w500/cHF3gKW3k7r2Bkp9vhWJWCMVdLo.jpg", rating: 4.2, price: 200, offerPrice: 160, language: "Tamil", genres: ["Drama", "Action"], director: "Mani Ratnam", cast: ["Vikram", "Aishwarya Rai", "Jayam Ravi"], releaseDate: new Date("2022-09-30"), videoUrl: "https://www.youtube.com/embed/KsH2LA8pCjo", featured: false }
];

const seedDatabase = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quickshow';
        console.log('🔌 Connecting to MongoDB:', mongoUri);

        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('\n🧹 Clearing existing data...');
        await Movie.deleteMany({});
        await Category.deleteMany({});
        await User.deleteMany({});
        console.log('✅ Data cleared');

        // Insert categories
        console.log('\n📁 Inserting categories...');
        const insertedCategories = await Category.insertMany(categories);
        console.log(`✅ Inserted ${insertedCategories.length} categories`);

        // Insert movies
        console.log('\n🎬 Inserting movies...');
        const insertedMovies = await Movie.insertMany(movies);
        console.log(`✅ Inserted ${insertedMovies.length} movies`);

        // Create admin user
        console.log('\n👤 Creating admin user...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Admin@1234', salt);

        const adminUser = await User.create({
            name: 'Admin',
            email: 'admin@quickshow.com',
            password: hashedPassword,
            role: 'admin'
        });
        console.log('✅ Admin user created');
        console.log('   Email: admin@quickshow.com');
        console.log('   Password: Admin@1234');

        // Create a test regular user
        console.log('\n👤 Creating test user...');
        const testPassword = await bcrypt.hash('Test@1234', salt);
        await User.create({
            name: 'Test User',
            email: 'test@quickshow.com',
            password: testPassword,
            role: 'user'
        });
        console.log('✅ Test user created');
        console.log('   Email: test@quickshow.com');
        console.log('   Password: Test@1234');

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Categories: ${insertedCategories.length}`);
        console.log(`   - Movies: ${insertedMovies.length}`);
        console.log(`   - Users: 2 (1 admin + 1 test user)`);
        console.log('\n📦 MongoDB Collections:');
        console.log('   - users (for authentication)');
        console.log('   - movies (film catalog)');
        console.log('   - categories (genres)');
        console.log('   - orders (booking history)');
        console.log('   - reviews (user ratings)');
        console.log('\n✅ You can now login with:');
        console.log('   Admin: admin@quickshow.com / Admin@1234');
        console.log('   User: test@quickshow.com / Test@1234');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error seeding database:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
};

seedDatabase();

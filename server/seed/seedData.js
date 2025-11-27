const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Category = require('../models/Category');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('📦 MongoDB Connected');
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Movie.deleteMany({});
        await Category.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@quickshow.com',
            password: 'Admin@123',
            role: 'admin'
        });
        console.log('👤 Admin user created: admin@quickshow.com / Admin@123');

        // Create regular user
        const user = await User.create({
            name: 'Test User',
            email: 'user@quickshow.com',
            password: 'User@123',
            role: 'user'
        });
        console.log('👤 Test user created: user@quickshow.com / User@123');

        // Create categories
        const categories = await Category.insertMany([
            { name: 'Action', description: 'High-octane action movies' },
            { name: 'Drama', description: 'Compelling dramatic stories' },
            { name: 'Comedy', description: 'Laugh-out-loud comedies' },
            { name: 'Thriller', description: 'Edge-of-your-seat thrillers' },
            { name: 'Sci-Fi', description: 'Science fiction adventures' },
            { name: 'Romance', description: 'Romantic films' },
        ]);
        console.log(`📁 Created ${categories.length} categories`);

        // Create movies
        const movies = await Movie.insertMany([
            {
                title: 'The Last Guardian',
                description: 'An epic tale of courage and sacrifice in a world on the brink of destruction.',
                posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
                genres: ['Action', 'Sci-Fi'],
                language: 'English',
                cast: ['John Doe', 'Jane Smith', 'Robert Johnson'],
                director: 'Michael Director',
                price: 299,
                offerPrice: 199,
                rating: 4.5,
                releaseDate: new Date('2024-01-15'),
                status: 'published',
                featured: true,
                createdBy: admin._id
            },
            {
                title: 'Midnight Chronicles',
                description: 'A mysterious thriller that will keep you on the edge of your seat.',
                posterUrl: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop',
                genres: ['Thriller', 'Drama'],
                language: 'English',
                cast: ['Emily Watson', 'David Lee', 'Sarah Connor'],
                director: 'Lisa Director',
                price: 249,
                rating: 4.2,
                releaseDate: new Date('2024-02-20'),
                status: 'published',
                createdBy: admin._id
            },
            {
                title: 'Comedy Central',
                description: 'The funniest movie of the year that will have you laughing non-stop.',
                posterUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
                genres: ['Comedy'],
                language: 'English',
                cast: ['Chris Funny', 'Amy Laughs', 'Tom Jokes'],
                director: 'Comedy King',
                price: 199,
                offerPrice: 149,
                rating: 4.8,
                releaseDate: new Date('2024-03-10'),
                status: 'published',
                createdBy: admin._id
            },
            {
                title: 'Love in Paris',
                description: 'A beautiful romantic tale set in the heart of Paris.',
                posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop',
                genres: ['Romance', 'Drama'],
                language: 'English',
                cast: ['Emma Stone', 'Ryan Gosling', 'Rachel McAdams'],
                director: 'Romance Master',
                price: 279,
                offerPrice: 199,
                rating: 4.6,
                releaseDate: new Date('2024-02-14'),
                status: 'published',
                createdBy: admin._id
            },
            {
                title: 'Space Odyssey 2024',
                description: 'An interstellar journey beyond imagination.',
                posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
                genres: ['Sci-Fi', 'Action'],
                language: 'English',
                cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
                director: 'Christopher Nolan',
                price: 349,
                offerPrice: 249,
                rating: 4.9,
                releaseDate: new Date('2024-01-01'),
                status: 'published',
                createdBy: admin._id
            },
            {
                title: 'The Silent Witness',
                description: 'A gripping drama about truth and justice.',
                posterUrl: 'https://images.unsplash.com/photo-1574267432644-f610a172b07c?w=400&h=600&fit=crop',
                genres: ['Drama', 'Thriller'],
                language: 'English',
                cast: ['Denzel Washington', 'Viola Davis', 'Morgan Freeman'],
                director: 'Steven Spielberg',
                price: 299,
                rating: 4.4,
                releaseDate: new Date('2024-03-25'),
                status: 'published',
                createdBy: admin._id
            },
            {
                title: 'Fast Lane Heroes',
                description: 'High-speed action and adrenaline-pumping stunts.',
                posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
                genres: ['Action'],
                language: 'English',
                cast: ['Vin Diesel', 'Dwayne Johnson', 'Jason Statham'],
                director: 'Justin Lin',
                price: 279,
                offerPrice: 179,
                rating: 4.3,
                releaseDate: new Date('2024-04-12'),
                status: 'published',
                createdBy: admin._id
            },
            {
                title: 'The Detective',
                description: 'A brilliant detective solves the most complex cases.',
                posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
                genres: ['Thriller', 'Drama'],
                language: 'English',
                cast: ['Benedict Cumberbatch', 'Martin Freeman', 'Andrew Scott'],
                director: 'Guy Ritchie',
                price: 249,
                rating: 4.7,
                releaseDate: new Date('2024-02-28'),
                status: 'published',
                createdBy: admin._id
            }
        ]);
        console.log(`🎬 Created ${movies.length} movies`);

        console.log('\n✅ Seed data created successfully!');
        console.log('\n📝 Login Credentials:');
        console.log('   Admin: admin@quickshow.com / Admin@123');
        console.log('   User:  user@quickshow.com / User@123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

connectDB().then(() => seedData());

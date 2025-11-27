const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const testConnection = async () => {
    try {
        console.log('Testing connection to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully');

        // Try a simple operation
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('✅ Collections listed:', collections.map(c => c.name));

        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        console.error('Possible causes:');
        console.error('1. IP Address not whitelisted in MongoDB Atlas.');
        console.error('2. Incorrect username/password.');
        console.error('3. Network issues.');
        process.exit(1);
    }
};

testConnection();

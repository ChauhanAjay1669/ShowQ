const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
        unique: true // Prevent duplicate movies
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    posterUrl: {
        type: String,
        required: [true, 'Please provide a poster URL']
    },
    videoUrl: {
        type: String,
        default: '',
        trim: true // Trailer/teaser URL (YouTube embed link)
    },
    duration: {
        type: Number, // Duration in minutes
        min: 0
    },
    genres: [{
        type: String,
        trim: true
    }],
    language: {
        type: String,
        required: [true, 'Please provide a language']
    },
    cast: [{
        type: String,
        trim: true
    }],
    director: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: 0
    },
    offerPrice: {
        type: Number,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    releaseDate: {
        type: Date,
        required: [true, 'Please provide a release date']
    },
    status: {
        type: String,
        enum: ['published', 'upcoming', 'draft'],
        default: 'published'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    featured: {
        type: Boolean,
        default: false
    },
    trending: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for search
movieSchema.index({ title: 'text', description: 'text', cast: 'text', director: 'text' });

module.exports = mongoose.model('Movie', movieSchema);

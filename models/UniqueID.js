const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the schema for unique IDs
const uniqueIDSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    uniqueID: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 1 day in seconds
    }
});

// Create a model based on the schema
const Unique = mongoose.model('Unique', uniqueIDSchema);

module.exports = Unique;

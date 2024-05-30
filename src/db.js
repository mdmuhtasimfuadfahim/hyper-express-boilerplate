const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;
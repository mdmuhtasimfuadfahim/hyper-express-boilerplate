const HyperExpress = require('hyper-express');
const config = require('./config');
const logger = require('./middlewares/logger');
const { mockAPIRoutes, userRoutes } = require('./routes'); // Import userRoutes
const compression = require('compression');
const connectDB = require('./db');

const app = new HyperExpress.Server();

// Connect to MongoDB
connectDB();

// Use compression middleware
// app.use(compression());

// Use logger middleware
app.use(logger);

// Use routes
app.use('/api', mockAPIRoutes);
app.use('/api', userRoutes); // Use userRoutes

// Start the server
app.listen(config.PORT)
    .then(server => {
        console.log(`HyperExpress server started on port ${config.PORT}`);
    })
    .catch(error => {
        console.error('Failed to start HyperExpress server', error);
    });
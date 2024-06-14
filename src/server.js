const HyperExpress = require('hyper-express');
const config = require('./config');
const logger = require('./middlewares/logger');
const { mockAPIRoutes, userRoutes } = require('./routes');
const { waterline, config: dbConfig } = require('./db/sails');
const app = new HyperExpress.Server();

// Initialize Waterline
waterline.initialize(dbConfig, (err, ontology) => {
    if (err) {
        console.error('Database connection failed', err);
        process.exit(1);
    }

    console.log('MongoDB connected');

    // making the User model globally available
    global.User = ontology.collections.user

    // Use logger middleware
    app.use(logger);

    // Use routes
    app.use('/api', mockAPIRoutes);
    app.use('/api/user', userRoutes);

    // Start the server
    app.listen(config.PORT)
        .then(server => {
            console.log(`HyperExpress server started on port ${config.PORT}`);
        })
        .catch(error => {
            console.error('Failed to start HyperExpress server', error);
        });

});
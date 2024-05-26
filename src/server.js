const HyperExpress = require('hyper-express');
const config = require('./config');
const logger = require('./middlewares/logger');
const { mockAPIRoutes } = require('./routes');

const app = new HyperExpress.Server();

// Use logger middleware
app.use(logger);

// Use routes
app.use('/api', mockAPIRoutes);

// Start the server
app.listen(config.PORT)
    .then(server => {
        console.log(`HyperExpress server started on port ${config.PORT}`);
    })
    .catch(error => {
        console.error('Failed to start HyperExpress server', error);
    });

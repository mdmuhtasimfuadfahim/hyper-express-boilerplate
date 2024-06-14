const Waterline = require('waterline');
const sailsDiskAdapter = require('sails-disk');
const mongoAdapter = require('sails-mongo');
const User = require('../models/user.model');

const waterline = new Waterline();
waterline.registerModel(User);

const config = {
    adapters: {
        'disk': sailsDiskAdapter,
        'mongo': mongoAdapter
    },
    datastores: {
        default: {
            adapter: 'mongo',
            url: process.env.MONGODB_URI
        }
    }
};

module.exports = { waterline, config };
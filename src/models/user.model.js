const Waterline = require('waterline');

const User = Waterline.Collection.extend({
    identity: 'user',
    datastore: 'default',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'number',
            autoMigrations: { autoIncrement: true }
        },
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
            required: true
        },
        image: {
            type: 'string',
            required: false
        },
    },
});

module.exports = User;
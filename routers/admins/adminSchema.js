const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    Email: 'string',
    Password: 'string'
});

module.exports = adminSchema;

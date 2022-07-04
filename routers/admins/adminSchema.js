const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    email: 'string',
    password: 'string'
});

module.exports = adminSchema;

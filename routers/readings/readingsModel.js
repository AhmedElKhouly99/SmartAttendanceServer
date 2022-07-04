const mongoose = require('mongoose');
const readingsSchema = require('./readingsSchema')
const readingsModel = mongoose.model('Readings',readingsSchema);  //carsModel is a model in the app (something like collection).. name of the collection is (cars) and following the schema passed
module.exports = readingsModel;  
const { string, number } = require("joi");
const mongoose = require("mongoose");
const readingsSchema = new mongoose.Schema({
  TimeStamp: {type: "string", required: true},
  FirstName: { type: "string", required: true },
  LastName: { type: "string", required: true },
  email: { type: "string", required: true},
  RFID: {type: "string", required: true},
  Temprature: {type: 'number', required: true}
});

module.exports = readingsSchema;

const { string, number } = require("joi");
const mongoose = require("mongoose");
const readingsSchema = new mongoose.Schema({
  TimeStamp: {type: "string", required: true},
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  RFID: {type: "string", required: true},
  Temperature: {type: 'number', required: true}
});

module.exports = readingsSchema;

const express = require("express");
const readingsModel = require("./readingsModel");

// creation of Router
const readingsRouter = express.Router();



readingsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await readingsModel.find());
  } catch (error) {
    next(error);
  }
});



readingsRouter.get("/today", async (req, res, next) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const d =  date.getDate()+"/" +(m+1) +"/"+y;
  console.log(d);
  try {
    const data = await readingsModel.find({TimeStamp: d});
    res.send(data);
  } catch (error) {
    next(error);
  }
});



readingsRouter.get("/:rfid", async (req, res, next) => {
  const {rfid} = req.params;
  console.log(rfid);
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = "/" +(m+1) +"/"+y;
  try {
    const data = await readingsModel.find({RFID: rfid, TimeStamp: { $regex: d }});
    res.send(data);
  } catch (error) {
    next(error);
  }
});






module.exports = readingsRouter;

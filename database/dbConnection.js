const mongoose = require('mongoose');

const uri = "mongodb+srv://smartAttendance:123454321_aM@cluster0.ql6c2yk.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  try {
    // Connect the client to the server
    await mongoose.connect(uri);

    // Establish and verify connection
    console.log("Connected successfully to server");
  } catch(error) {
    // Ensures that the client will close when you finish/error
    console.log(error);
    process.exit(1);
  }
}
run();

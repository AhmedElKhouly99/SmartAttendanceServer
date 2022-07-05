const express = require('express');
const app  = express();
const mqtt = require('mqtt')
require('./database/dbConnection');
// const path = require('path');
const morgan = require('morgan');
// const favicon = require('serve-favicon');
const readingsRouter = require('./routers/readings/readingsRouter');
const readingsModel = require("./routers/readings/readingsModel");
// const adminRouter = require('./routers/admins/adminRouter');
require('dotenv').config();
var cors = require('cors');
app.use(cors())
var bodyParser = require('body-parser');

// app.use(express.urlencoded());

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(morgan('combined'));
app.use(['reading', 'readings'], readingsRouter);

app.get('/', async (req, res) => {
    res.send('hello');
});


const host = 'learning.masterofthings.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'iot_intake42',
  password: 'iot_intake42',
  reconnectPeriod: 1000,
})

const topic = 'iot_intake42/reading/rfid'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
//   client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
//     if (error) {
//       console.error(error)
//     }
//   })
})
client.on('message', async (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
  const reading = JSON.parse(payload);
  console.log(reading);
  await readingsModel.create({...reading});
})









app.use(['/reading', '/readings'], readingsRouter);
// app.use(['/admins','/admin'], adminRouter);

// app.use(favicon(path.join(__dirname, 'staticFiles', 'images', 'favicon.ico')));
// app.use(express.static('staticFiles', {
//         index: 'html/home.html'
//     })
// );


// app.get('/home', (req, res)=>{
//     htmlFilePath = path.join(__dirname, 'staticFiles', 'html', 'home.html');
//     res.sendFile(htmlFilePath);
// });

// // app.use(['/user', '/users'], usersRouter);

app.use((err, req, res, next) => {
    if(!err.status){
        err.message = 'something went wrong';
        console.log(err);
        //send mail
        //log on server
    }
    else if(err.code === 'VALIDATION_ERROR'){
        
    }
    res.status(err.status || 500).send(err.message);
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});
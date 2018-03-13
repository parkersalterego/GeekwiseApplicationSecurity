const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set("env", process.env.NODE_ENV || "development");
app.set("host", process.env.HOST || "0.0.0.0");
app.set("port", process.env.PORT || 3000);

app.get('/', (err, req, res, next) => {
  if(err) {
    next(err);
  } else {
    res.send('Invalid Endpoint...');
  }
});

app.use(cors());

app.use(bodyParser());

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('connected', (req, res, next) => {
  console.log('connected to database ' + process.env.DATABASE);
});

mongoose.connection.on('error', (req, res, next) => {
  console.log('error connecting to databse ' + err);
  next(err);
});

app.listen(app.get("port"), () => {
  console.log('\n' + '*******************************');
  console.log('REST API listening on port ' + app.get("port"));
  console.log('*******************************' + '\n');
});
/**
 * this shoudle be the starting point of the application
 */
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); //false pure string
/**
 * i need to connect  to the database
 */

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on('error', () => {
  console.log('Error while connecting to DB');
});
db.once('open', () => {
  console.log('connected to database');
});

// /**
//  * Plugging in the routes
//  */
require('./routes/Auth.routes')(app);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started on the port no :${serverConfig.PORT}`);
});

/**
 * this shoudle be the starting point of the application
 */
const serverConfig = require('./configs/server.config');
const express = require('express');
const app = express();

app.listen(serverConfig.PORT, () => {
  console.log(`Server started on the port no :${serverConfig.PORT}`);
});

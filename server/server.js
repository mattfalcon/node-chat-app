//built in module
const path = require('path');
//load in express
const express = require('express');

//avoids going into and out of server
const publicPath = path.join(__dirname, '../public');

//
const port = process.env.PORT || 3000;

//configure express by calling methods on app
var app = express();

//calling app to configue express static middleware
app.use(express.static(publicPath));

//start up server on port 3000 with callback function (console.log)
app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
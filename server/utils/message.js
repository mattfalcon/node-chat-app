var moment = require('moment')

var generateMessage = (from, text) => {
    return{
        from,
        text,
        //moment value of grabs timestamp
        createdAt: moment().valueOf()
    };
};


var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from, 
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

//to integrate into server.js
module.exports = {generateMessage, generateLocationMessage};
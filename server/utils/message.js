var generateMessage = (from, text) => {
    return{
        from,
        text,
        createdAt: new Date().getTime()
    };
};


//to integrate into server.js
module.exports = {generateMessage};
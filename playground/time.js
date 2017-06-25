var moment = require('moment');

// var date = new Date();
// var months = ['Jan', 'Feb']
// console.log(date.getMonth());

//call to moment function loaded above (creates a new moment object)
var date = moment();

//Time
console.log(date.format('hh:mm:ss'))
console.log(date.format('h:mm'))
console.log(date.format('h:mm a'))


//format method 
// date.add(1, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));
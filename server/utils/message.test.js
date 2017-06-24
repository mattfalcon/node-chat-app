//load in expect let us make assertions about return value from generate message function
var expect = require('expect');

//load in module we're testing create variable with ES6 structure, require local path
var {generateMessage} = require('./message')

//describe block
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        //store res in variable
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
        //assert from match
        //assert text match
        //assert createdat is number
    })
})
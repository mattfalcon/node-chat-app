const expect = require('expect');

//import isRealString
const {isRealString} = require('./validation');


//isRealString
    //should reject no-string values
    //should reject string with only spaces
    //should allow string with non-space characters

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(98);
        expect(res).toEqual(false);
    })
    it('should reject string with only spaces', () => {
        var res = isReal ('   ');
        expect(res).toBe(false);
    });
    it ('should allow string with non-space characters', () => {
        var res = isRealString('    Andrew  ');
        expect(res).toBe(true);
    });
});
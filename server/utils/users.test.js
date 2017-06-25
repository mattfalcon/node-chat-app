
const expect = require('expect');

const {Users} = require('./users');
var users;

beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Mike',
        room: 'Node Course'
    }, {
        id: '2',
        name: 'John',
        room: 'Node Course'
    },{
        id: '3',
        name: 'JOrge',
        room: 'React Course'
    }]    
})


describe('Users', () => {
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'John',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
       //second users is from empty arrray
        expect(users.users).toEqual([user]);
    });
    it('should return names for node course', () => {
        var userList = users.getUserList('Node Couse');
        //assertion
        expect(userList).toEqual(['Mike', 'John'])
    })
});
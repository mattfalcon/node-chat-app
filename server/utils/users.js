[{
    id: '/12#poiajdspfoif',
    name: 'Andrew',
    room: 'The Office'
}]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

//es6, class can add constructor function
//automatically fires and lets you use a class
class Users {
    constructor () {
        //empty array
        this.users = []
    }
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
    //return user that was removed
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser (id) {
        //return user object whose ID matches ID argument, if user id property = id argument keep, return 1st item
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        })
        var namesArray = users.map((user) => {
            return user.name 
        });
        return namesArray;
    }
}

module.exports = {Users};

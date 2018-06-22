const expect = require('expect');
const {Users} = require('./users');

describe('addUser', () => {
  var user;

  beforeEach(() => {
      user = new Users();
      user.userArr = [{
        id: 1,
        name: 'User1',
        room: 'Room1'
      },
      {
        id: 2,
        name: 'User2',
        room: 'Room2'
      },
      {
        id: 3,
        name: 'User3',
        room: 'Room2'
      }];
  });

  it('should add a user', () => {

    var user = new Users();
    var testUser = {
      id: 123,
      name: 'user1',
      room: 'room1'
    };

    user.addUser(testUser.id, testUser.name, testUser.room);

    expect(user.userArr).toEqual([testUser]);

  });


  it('should get a user by id', () => {

    var userDetails = user.getUser(2);
    expect(userDetails).toEqual({
      id: 2,
      name: 'User2',
      room: 'Room2'
    });

  });

  it('should not find a user by id', () => {

    var userDetails = user.getUser(4);
    expect(userDetails).toBe(undefined);

  });



  it('should return a user list for room2', () => {

    var list = user.getUserList('Room2');
    expect(list).toEqual(['User2', 'User3']);

  });


  it('should remove a valid id', () => {

    var userDetails = user.removeUser(2);
    expect(userDetails).toEqual([{
      id: 1,
      name: 'User1',
      room: 'Room1'
    },
    {
      id: 3,
      name: 'User3',
      room: 'Room2'
    }]);

  });


  it('should not remove invalid id', () => {

    var userDetails = user.removeUser(4);
    expect(userDetails).toEqual([{
      id: 1,
      name: 'User1',
      room: 'Room1'
    },{
      id: 2,
      name: 'User2',
      room: 'Room2'
    },
    {
      id: 3,
      name: 'User3',
      room: 'Room2'
    }]);

  });


});

class Users {
  constructor() {
    this.userArr = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.userArr.push(user);
    return user;
    //console.log('new arr: ',this.userArr);
  }

  getUser(id) {
    var user = this.userArr.filter((user) => user.id === id)[0];
    return user;
  }

  removeUser(id) {
    var userIndex = this.userArr.findIndex((user) => user.id === id); // this returns the index of the found id
    if(userIndex >= 0){
      //console.log('this is removed: ',this.userArr.splice(userIndex, 1)[0]);
      //return this.userArr;
      return this.userArr.splice(userIndex, 1)[0];
    }

  }

  getUserList(room) {
    var objectList = this.userArr.filter((user) => user.room === room);
    var nameList = objectList.map((user) => user.name);

    return nameList;
  }
}

module.exports = {Users};

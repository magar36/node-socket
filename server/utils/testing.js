// var fruits = [{name:'a',id:1}, {name:'b',id:2}, {name:'c',id:3}];
// console.log(fruits);
// var index = fruits.findIndex((fruit) => fruit.id === 2);
// console.log(index);
// if(index >= 0){
//   console.log('id found');
//   var fruitsNew = fruits.splice(index, 1);
//   console.log(fruitsNew);
//   console.log(fruits);
//
// } else {
//   console.log('id not found');
//   console.log(fruits);
//
// }

var names = ['mohit','shikha','shalini','manu'];
var someName = 'shal';
var someName1 = 'manu';

names.find((name) => {
if(name == someName1){
  console.log('found');
}// else {
//   console.log('not found');
// }
})
// {
//   console.log('found');
// } else {
//   console.log('not found');
// }

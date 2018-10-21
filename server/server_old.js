var {mongoose} = require('db/mongoose');



// var newTodo = new Todo({
//   text : 'Cook dinner'
// });
// newTodo.save().then((doc)=>{
//   console.log('Saved todo :',doc);
// },(e)=>{
//   console.log('Unable to save todo');
// });


// var otherTodo = new Todo({
//   text : 'Feed the Cat',
//   completed : true,
//   completedAt : 123
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// },(e) => {
//   console.log('Unable to save todo');
// });




var user = new User({
  email : 'ranavir.silicon@gmail.com'
});

user.save().then((doc)=>{
  console.log('User saved : ',doc);
},(e)=>{
  console.log('Unable to save user',e);
});

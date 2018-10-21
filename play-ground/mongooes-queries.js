const {ObjectId} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

var id = "5bcc4d2ecf2f5267404e3b5b";
//for validation of object id we can use ObjectId
if(!ObjectId.isValid(id)){
  console.log('ID is not valid');
}

Todo.find({
  _id : id
}).then((todos)=>{
  console.log('Todos',todos)
});

Todo.findOne({//finds only the first match record
  _id : id
}).then((todo)=>{
  console.log('Todo',todo)
});

Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log('Id not found');
  }
  console.log('Todo By Id',todo);
}).catch((err) =>{
  console.log(err);
});

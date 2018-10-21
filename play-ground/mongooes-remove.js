const {ObjectId} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

Todo.remove({}).then((result)=>{
  console.log(result);
});

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findOneAndRemove({_id:'5bccbbf3b824090015ac7455'}).then((result) => {
  console.log(result);
});

Todo.findByIdAndRemove({'5bccbbf3b824090015ac7455'}).then((result) => {
  console.log(result);
});

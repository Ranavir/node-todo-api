//import configurations
require('./config/config')

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

//use below express middleware statement to parse the request body aloways to a json
app.use(bodyParser.json());

app.post('/todos',(req, res)=>{
  console.log(req.body);
  var newTodo = new Todo({
    text : req.body.text
  });
  newTodo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos',(req, res)=>{
  Todo.find().then((todos)=>{
    // res.send(todos);
    res.send({
      todos,
      status : 'OK'
    });
  }, (err)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req, res)=>{
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    res.status(404).send();
  }
  Todo.findById(req.params.id).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.send({  todo });
  }).catch((err) =>{
    res.status(400).send(err);
  });

});

app.delete('/todos/:id',(req, res) => {
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      res.status(404).send();
    }
    res.send({  todo });
  }, (err)=>{
    res.status(400).send(err);
  });
});
app.listen(port, () => {
  console.log(`App started up at port : ${port}`);
});

app.patch('/todos/:id',(req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);//this checks if any of these two values are present in req body, as we don't update anything else
  if(!ObjectId.isValid(id)){
    res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.send({  todo });
  }).catch((err) =>{
    res.status(400).send(err);
  });

});

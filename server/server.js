//import configurations
require('./config/config')

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')
var app = express();
const port = process.env.PORT || 3000;

//use below express middleware statement to parse the request body aloways to a json
app.use(bodyParser.json());
app.use((req, res,next)=>{
		var now = new Date().toString();

		console.log(`${now} : ${req.method} ${req.url}`);//logger
		next();
	}
);

//Todo URIs
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


//User Post URI
app.post('/users',(req, res)=>{
  console.log(req.body);
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=> {
    res.status(400).send(e);
  });
});


app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});



app.get('/users/me',authenticate,(req, res) =>{
  res.send(req.user);
});
app.get('/users',(req, res)=>{
  User.find().then((users)=>{

    // users = _.map(users, function(user) {
    //   return _.pick(user, ['email', 'password']);
    // });
    res.send({
      users,
      status : 'OK'
    });
  }, (err)=>{
    res.status(400).send(e);
  });
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    //res.send(user);
    return user.generateAuthToken().then((token) =>{
      res.header('x-auth', token).send(user);
    });
  }).catch((err)=>{
    res.status(401).send();
  });

});

app.listen(port, () => {
  console.log(`App started up at port : ${port}`);
});

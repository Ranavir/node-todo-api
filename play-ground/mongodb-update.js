// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) =>{
    if(error){
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server..');
    const db = client.db('TodoApp');



    //Retrieving document by Id
    db.collection('Users').findOneAndUpdate({
      _id : new ObjectId("5b9636f815eccc4758d96276")
    },{
      $set:{
          age : 31
      }
    },{
        returnOriginal : true // OR we can use [new : true]
      }
    );


    client.close();
});

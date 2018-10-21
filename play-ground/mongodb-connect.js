// const MongoClient = require('mongodb').MongoClient;

//Object Destructuring
// const mongodb = require('mongodb');
// const {MongoClient, ObjectId} = mongodb;//extracting or destructuring MongoClient & ObjectId Function variables from mongodb object and naming them as MongoClient & ObjectId
// var obj = new ObjectId();
// console.log(obj);


// MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) =>{
//     if(error){
//       return console.log('Unable to connect to MongoDB server');
//     }
//     console.log('connected to MongoDB server..');
//     const db = client.db('TodoApp');
//
//     //insert one Todo
//     db.collection('Todos').insertOne({
//       text : "Something to do",
//       completed : false
//     },(err,result) =>{
//       if(err){
//         return console.log("Error inserting data to Todos :",err);
//       }
//       console.log(JSON.stringify(result.ops,undefined,2));
//     });
//     //insert one user
//     db.collection('Users').insertOne({
//       name : "Ranavir Dash",
//       age : 29,
//       location : "Karthiknagar, Bengaluru, 560037"
//     }, (err, result) => {
//       if(err){
//         return console.log('Error inserting user record..',err);
//       }
//       console.log(JSON.stringify(result.ops,undefined,2));
//     });
//
//     client.close();
// });

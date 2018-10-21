// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) =>{
    if(error){
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server..');
    const db = client.db('TodoApp');

    // db.collection('Todos').find().toArray().then((docs) => {
    //   console.log('Todos :');
    //   console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //   console.log('Unable to fetch todos...',error);
    // });

    //Retrieving document by Id
    db.collection('Todos').find({
      _id:new ObjectId('5b9634eeaa5bcd1f54add4ff')
    }).toArray().then((docs) => {
      console.log('Todos :');
      console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
      console.log('Unable to fetch todos...',error);
    });


    // db.collection('Todos').find({completed:true}).toArray().then((docs) => {
    //   console.log('Todos :');
    //   console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //   console.log('Unable to fetch todos...',error);
    // });
    client.close();
});

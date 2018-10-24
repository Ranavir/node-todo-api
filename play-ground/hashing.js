const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var message = "The great captain ranavir";
var sha256Hash = SHA256(message);

console.log("Plain test :"+message);
console.log("Sha256 hash :"+sha256Hash);


//create tokens
var data = {
  id : 10,
}
var token = jwt.sign(data,'somerandomkey');
console.log(token);

//verify
var decoded = jwt.verify(token,'somerandomkey');
console.log(decoded);

// create tokens
// var data = {
//   id : 4,
// }
// var token = {
//   data,
//   hash : SHA256(JSON.stringify(data)+'somerandomString').toString()
// }
// //verify token
// var resulthash = SHA256(JSON.stringify(token.data) + 'somerandomString').toString();
// if(token.hash === resulthash){
//    console.log('Data was not changed');
// }else{
//   console.log('Data was changed do not trust!');
// }

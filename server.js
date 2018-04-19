//Getting the Json from a file
var fs = require('fs');

var data = fs.readFileSync('usersData.json');
//raw data
console.log(data);
//parsed data
var usersData = JSON.parse(data);
console.log(usersData);


const express = require('express');
const app = express();
app.listen(3000, () => console.log('App running on port 3000!'));
app.use(express.static('web'));


app.get('/all', sendResp);
function sendResp(req, res){
	res.send(usersData);
}

app.get('/user/:admin/:name/:age/:email/:password/', addUser);

function addUser(req, res){

  var reqData = req.params;
  var admin = reqData.admin;
  var name = reqData.name;
  var age = Number(reqData.age);
  var email = reqData.email;
  var password = reqData.password;

  usersData[name] = admin;

  var data = JSON.stringify(usersData, null, 2);

  fs.writeFile('usersData.json', data, finished);

function finished(){
	console.log('File Saved.');
}
}

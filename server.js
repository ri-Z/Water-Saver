const fs = require('fs');
var data = fs.readFileSync('usersData.json');
var users = JSON.parse(data);
console.log(users);

const express = require('express');
const app = express();
const mysql = require('mysql');
<<<<<<< HEAD
const bodyParser = require ('body-parser');
=======
const bodyParser = require('body-parser');
>>>>>>> 14e3bdb3790bf8bc920870a471365b648c035879

app.listen(3000, () => console.log('App running on port 3000!'));
app.use(express.static('web'));

<<<<<<< HEAD
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
=======
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
>>>>>>> 14e3bdb3790bf8bc920870a471365b648c035879

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Prune098",
  port: "3306",
	database: "WaterSaver"
});

db.connect (function(err){
  if(err) throw err;
  console.log("Connected");


app.get('/CreateDB', function(req, res) {
  let sql = "Create DATABASE WaterSaver";

 db.query(sql, function (err, result) {
      if (err) throw err;
       //console.log("Result: " + result);
       console.log("Database created!");
   })
 })
 });

app.get('/user/:name/:admin/:age/:email/:password/', addUser);
function addUser(request, response){
  var reqData = request.params;
  var admin = reqData.admin;
  var name = reqData.name;
  var age = reqData.age;
  var email = reqData.email;
  var password = reqData.password;

  var space = ", ";
  var nimda = "admin - ";
  var ega = "age - ";
  var liame = "email - ";
  var drowssap = "password - ";
  users[name] = nimda + admin + space + ega + age + space + liame + email + space + drowssap + password;

  var data = JSON.stringify(users, null, 2);
  fs.writeFile('usersData.json', data, finished);
  function finished(err) {
    console.log(users);
    console.log("ALL SET");
  }


  response.send(data);
	let sql = "INSERT INTO User (Admin, Name, Birth, Email, Password) VALUES ('"+admin+"', '"+name+"', '"+age+"', '"+email+"', '"+password+"')";
	db.query(sql, function (err, result, fields) {
		if (err) {
			throw err;
		}
		console.log("User Inserted into Database");
	});

<<<<<<< HEAD
// 	db.query("SELECT * FROM User", function (err, result, fields) {
// 		if (err) {
// 			throw err;
// 		}
// 		console.log("o select all é" + result);
// 	});
 }
  app.get('/all', sendAll);
  function sendAll(request, response){
    response.send(users);
  }
=======
	// db.query("SELECT * FROM User", function (err, result, fields) {
	// 	if (err) {
	// 		throw err;
	// 	}
	// 	console.log("o select all é" + result);
	// });
}

app.get('/all', sendAll);
function sendAll(request, response){
  response.send(users);
}
>>>>>>> 14e3bdb3790bf8bc920870a471365b648c035879

//"search bar like function STILL NOT IMPLEMENTED"
app.get('/search/:name/', searchUser);

function searchUser(request, response){
  var name = request.params.name;
  var reply;
  if (users[name]){
    reply = {
    status: "found",
    name: name,
    admin: users[name],
    age: users[name],
    email: users[name],
    password: users[name]
  }
} else {
  reply = {
    status: "not found",
    name: name
  }
}
}

<<<<<<< HEAD
app.get('/feed', function (req, res){
db.query("SELECT * FROM User;", function(err, result, fields){

  if (err) throw err;
  console.log(result);
});
=======
// GET feed
app.get('/feed', function(req, res){
	db.query("SELECT * FROM User;", function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
>>>>>>> 14e3bdb3790bf8bc920870a471365b648c035879
});







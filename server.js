const express = require('express');
const app = express();
const mysql = require('mysql');

app.listen(3000, () => console.log('App running on port 3000!'));
app.use(express.static('web'));

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
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


 // //Getting the Json from a file
 // var fs = require('fs');
 // var data = fs.readFileSync('usersData.json');
 // //raw data
 // console.log(data);
 // //parsed data
 // var usersData = JSON.parse(data);
 // console.log(usersData);

// app.get('/all', sendAll);
// function sendAll(request, response){
// 	response.send(usersData);
// }

app.get('user/:admin/:name/:age/:email/:password/', addUser);
function addUser(request, response){
  var reqData = request.params;
  var admin = reqData.admin;
  var name = reqData.name;
  var age = reqData.age;
  var email = reqData.email;
  var password = reqData.password;

	let sql = "INSERT into User (Admin, Name, Birth, Email, Password) VALUES ('"+admin+"', '"+name+"', '"+age+"', '"+email+"', '"+password+"')";
	db.query(sql, function (err, result, fields) {
		if (err) {
			throw err;
		}
		console.log("User Inserted");
	});

	db.query("SELECT * FROM User", function (err, result, fields) {
		if (err) {
			throw err;
		}
		console.log(result);
	});
	//usersData[name] = age;

  //var data = JSON.stringify(usersData, null, 2);

  //fs.writeFile('usersData.json', data, finished);

// function finished(){
// 	//console.log('File Saved with a User.');
// 	console.log('User Inserted');
// }
}

const fs = require('fs');
var data = fs.readFileSync('usersData.json');
var users = JSON.parse(data);
console.log(users);

const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
//const ejs = require('ejs');
const multer = require('multer');
const path   = require('path');
const serveStatic = require('serve-static');
const bcrypt = require('bcrypt');
  const saltRounds = 10;

// app.set('view engine', 'ejs');
// app.get('/', (req, res) => res.render('index'));

const server = app.listen(3000, () => console.log('App running on port 3000!'));
// app.use(serveStatic(path.join(__dirname, 'assets')));
// app.use(serveStatic(path.join(__dirname, 'images')));
// //HTML files are not cached, while everything else is for 1 day.
// app.use(serveStatic(path.join(__dirname, 'web'), {
//   maxAge: '1d',
//   setHeaders: setCustomCacheControl
// }));
//
// function setCustomCacheControl (res, path) {
//   if (serveStatic.mime.lookup(path) === 'text/html') {
//     // Custom Cache-Control for HTML files
//     res.setHeader('Cache-Control', 'web, max-age=0')
//   }
// }
app.use(express.static('images'));
app.use(express.static('assets'));
app.use(express.static('web'));

// app.use(express.static(path.join(__dirname, 'web')));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Prune098",
  port: "3306",
	database: "WaterSaver"
  //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
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

// app.get('/user/:name/:admin/:age/:email/:password/', addUser);
// function addUser(request, response){
//   var reqData = request.params;
//   var admin = reqData.admin;
//   var name = reqData.name;
//   var age = reqData.age;
//   var email = reqData.email;
//   var password = reqData.password;
//
//   var space = ", ";
//   var nimda = "admin - ";
//   var ega = "age - ";
//   var liame = "email - ";
//   var drowssap = "password - ";
//   users[name] = nimda + admin + space + ega + age + space + liame + email + space + drowssap + password;
//
//   var data = JSON.stringify(users, null, 2);
//   fs.writeFile('usersData.json', data, finished);
//   function finished(err) {
//     console.log(users);
//     console.log("ALL SET");
//   }
//
//
//   response.send(data);
// 	let sql = "INSERT INTO User (Admin, Name, Birth, Email, Password) VALUES ('"+admin+"', '"+name+"', '"+age+"', '"+email+"', '"+password+"')";
// 	db.query(sql, function (err, result, fields) {
// 		if (err) {
// 			throw err;
// 		}
// 		console.log("User Inserted into Database");
// 	});
// }

app.get('/all', sendAll);
function sendAll(request, response){
  response.send(users);
}


//MUDAR ISTO PARA CREATEUSER E POR OS CAMPOS DO USER TBM
//Insert data into Database with Post method
app.post('/createUser', (request, response)=>{
  //log da informacao qd escrevemos e clicamos no botao
  console.log(request.body);
  bcrypt.hash(request.body.password, saltRounds, function(err, hash) {
    if(err) throw err;
    let sql = 'INSERT INTO User(Admin, Name, Birth, Email, Password) VALUES (?, ?, ?, ?, ?);';
    let values = [request.body.admin, request.body.name, request.body.age, request.body.email, hash];

    db.query(sql, values, (err,result)=>{
      if(err)throw err;
      console.log(result);
      console.log("User Inserted into Database WaterSaver");
      response.send(result);
    });
  });
});

//putting photos in local storage
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './web/uploads')
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

app.post('/uploadimage',multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4' && ext !== '.mov' && ext !== '.m4v' && ext !== '.avi' && ext !== '.flv')
                    {
            return callback('Only images and videos are allowed', null)
        }
        callback(null, true)
    }
}).single('file'), function(req, res) {
  console.log(req.body);
  console.log(req.file);
  var data = [
      req.body.title,
      req.body.description,
      req.body.floor,
      req.body.room,
      req.file.path
    ];

  // var data2 = [
  //   rows.insertId,
  //   req.file.path
  // ];

    var query = db.query("INSERT INTO Post(Title, Description, Floor, Room, Media) VALUES (?, ?, ?, ?, ?);" , data, function(err, rows) {
      if (err) throw err;
      // console.log(rows.insertId);
      // var query2 = db.query("INSERT INTO Media(idPostFK, Media) VALUES (?, ?, ?);", data2, function(err, rows) {
      //   if (err) throw err;
      // });
      res.redirect('/Profile.html');
    });
});

app.get('/showPost', function(request, response) {
  db.query("Select * From Post Order by idPost DESC;", function(err, result, fields) {
    if (err) throw err;
    //console.log(result);
    response.send(result);
  });
});

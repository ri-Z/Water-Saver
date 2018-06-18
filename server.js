const fs = require('fs');
var data = fs.readFileSync('usersData.json');
var users = JSON.parse(data);
console.log(users);

const express = require('express');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
      //express mysql session
      const options = {
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "WaterSaver"
      };
      var sessionStore = new MySQLStore(options);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer');
const path   = require('path');
const serveStatic = require('serve-static');
const bcrypt = require('bcrypt');
  const saltRounds = 10;

const getImageUrls = require('get-image-urls');
const request = require('request');

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'web'));
// app.set('views', 'views');
// app.set('views', 'web')
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

//Authentication
app.use(cookieParser());
app.use(session({
  secret: 'jibirish',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  multipleStatements: true,
  port: "3306",
	database: "WaterSaver"
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
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
    // let sql = 'INSERT INTO User(Admin, Name, Birth, Email, Password) VALUES (?, ?, ?, ?, ?);';  //with admin and age options
    let sql = 'INSERT INTO User(Name, Email, Password) VALUES (?, ?, ?);'; //without admin and age options
    let values = [/*request.body.admin, */request.body.name, /*request.body.age, */request.body.email, hash];

    db.query(sql, values, (err,result)=>{
      if(err)throw err;
      console.log(result);
      console.log("User Inserted into Database WaterSaver");
      //response.send(result);

      let sql = "SELECT LAST_INSERT_ID() as user_id";
      db.query(sql,(err,result, fields)=>{
        if(err)throw err;

        const user_id = result[0];
        console.log("O user_id é: " + JSON.stringify(user_id));

          //LOGIN USER-create a session
          request.login(user_id, function(err){
            response.redirect('/');
        });
      });
    });
  });
});

//writing user data in the session
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});
//retrieving user datafrom the session
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

var middleware = {
 authenticationMiddleware: function (request, response, next){
    console.log(`request.session.passport.user: ${JSON.stringify(request.session.passport)}`);

      if (request.isAuthenticated()) return next();
      response.redirect('/login');
  },


// app.get('/loggedIn', authenticationMiddleware(), function(request, response) {
//   console.log("Estou aqui loggedIn! " + request.isAuthenticated());
//   if (request.isAuthenticated() == true) {
//     let loggedIn = true;
//     response.send(loggedIn);
//   }else {
//     let loggedIn = false;
//     response.send(loggedIn);
//   }
//     //console.log(result);
// });

  loggedIn: function (request, response, next) {
  db.query("Select session_id From sessions;", function(err, result, fields) {
    if (err) throw err;
    console.log("Session Result 0 é: " + result[0].session_id);
    console.log("request.session é " + JSON.stringify(request.session));
    // response.send(result);
    if (result[0].session_id != null) {
      console.log("result[0].session_id não é null");
      //response.redirect('/indexLoggedIn');
      next();
    }
  });
  }
}

// function headerMiddleware() {
//   return (request, response, next) => {
//     console.log("Estou aqui headerMiddleware! " + request.isAuthenticated());
//     if (request.isAuthenticated() == true) {
//       let loggedIn = true;
//       response.send(loggedIn);
//     }else {
//       let loggedIn = false;
//       response.send(loggedIn);
//     }
//   }
// }

app.get('/index', [middleware.authenticationMiddleware, middleware.loggedIn], (request,response)=>{
  //deserializeUser ... if so - creates a session and returns a session key
  console.log("O request.user é: " + JSON.stringify(request.user));
  console.log("O request.user.isAuthenticated é: " + request.isAuthenticated());
  response.redirect('/');
});
// app.get('/indexLoggedIn', middleware.authenticationMiddleware, (request,response)=>{
//   response.redirect('/indexLoggedIn.html');
// });
app.get('/post', [middleware.authenticationMiddleware, middleware.loggedIn], (request,response)=>{
  //deserializeUser ... if so - creates a session and returns a session key
  console.log(JSON.stringify(request.user));
  console.log(request.isAuthenticated());
  response.redirect('/createPost.html');
});

app.get('/login',(request,response)=>{
  response.redirect('/login.html');
});
//Local - for local database strategy
app.post('/login', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/login'
})) /*, (request, response)=>{
  response.send('done');
})*/;

app.get('/logout',(request,response)=>{
  request.logout();
  request.session.destroy();
  //TENTAR POR A FUNCIONAR, PQ DA ERRO DE SINCRONIZACAO
  // response.clearCookie('connect.sid', { path: '/' }).status(200).send('Cookie deleted.');
  response.redirect('/');
});
//POR ISTO A DAR
app.get('/register',(request,response)=>{
  response.redirect('/SignUp.html');
});
app.post('/register', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/login'
}));
app.get('/feed',(request,response)=>{
  response.redirect('/feed.html');
});

app.use(function(request, response, next) {
  response.locals.isAuthenticated = request.isAuthenticated();
  next();
});
//Routes
// app.use('/', index);
// app.use('/LogIn', login);
// app.use('/SignUp', register);
// app.use('/Post', post);


// let loggedIn;
// //verify if the user exists and the password is correct
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log(username);
//     console.log(password);
//
//       db.query('SELECT idUser, Password FROM User WHERE Name = ?',[username], (err,result)=>{
//       if(err)throw err;
//           console.log(result[0]);
//       //if nothing is returned
//       if(result.length===0){
//         console.log("Empty");
//         done(null,false);
//       }
//       const hash = result[0].Password.toString();
//       var response = bcrypt.compareSync(password, hash);
//             if(response===true){
//               return done(null, {user_id:result[0].idUser});
//               response.redirect('/index');
//               loggedIn = true;
//             }else{
//               done(null,false);
//               loggedIn = false;
//             }
//     });
//     //por string a false
//       return done(null, "falselel");
//   }
// ));

passport.use(new LocalStrategy(
  function(username, password, done) {
      console.log(username);
      console.log(password);

      db.query('SELECT idUser, Password FROM User WHERE Name = ?',[username], function(err, results, fields){
        if (err) {
          done(err);
        };
        if (results.length === 0) {
          console.log("Empty field");
          done(null, false);
        }else {
          const hash = results[0].Password.toString();
          console.log("O results[0] é: " + results[0].Password.toString());

          bcrypt.compare(password, hash, function(err, response){
            if (response === true) {
              return done(null, {user_id: results[0].idUser});
            }else {
              return done(null, false);
            }
          });
        }
      })
    }
));




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
        if (ext !== '.JPEG' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4' && ext !== '.mov' && ext !== '.m4v' && ext !== '.avi' && ext !== '.flv')
                    {
            return callback('Only images and videos are allowed', null)
        }
        callback(null, true)
    }
}).array('file', 6), function(req, res) {
  console.log(req.body);
  console.log("O req file é " + req.files[0].path);
  var data = [
      req.body.title,
      req.body.description,
      req.body.floor,
      req.body.room,
      req.body.status/*,
      req.files[0].path*/
    ];
    console.log("O status é " + req.body.status);
    console.log("O req.files[i] é " + JSON.stringify(req.files));

    for (var i = 0; i < req.files.length; i++) {
      console.log("O array[" + i + "] de files é " + req.files[i].path);
    }

    // var post_id;
    // var imagem = req.files;
    // var data2 = [
    //   post_id,
    //   imagem.path
    // ];
    // var query = db.query("INSERT INTO Post(Title, Description, Floor, Room, Status, Media) VALUES (?, ?, ?, ?, ?, ?);" , data, function(err, rows) {
    var query = db.query("INSERT INTO Post(Title, Description, Floor, Room, Status) VALUES (?, ?, ?, ?, ?);" , data, function(err, rows) {
      if (err) {throw err;} else {
        console.log("O PRIMEIRO rows.insertId é: " + rows.insertId);
        let sql = "SELECT LAST_INSERT_ID() as post_id";
        var query2 = db.query(sql,(err,result, fields)=>{
          if(err) {throw err;} else {
            post_id = result[0];
            console.log("O post_id é: " + JSON.stringify(post_id));
            console.log("O post_id com idPost: " + JSON.stringify({post_id: result[0].idPost}));
            console.log("O SEGUNDO rows.insertId é: " + rows.insertId);
          }
        });

        for (var i = 0; i < req.files.length; i++) {
          console.log("O SEGUNDO array[" + i + "] de files é " + req.files[i].path);
          console.log("O TERCEIRO rows.insertId é: " + rows.insertId);
          var query3 = db.query("INSERT INTO Media(idPostFK, Media) VALUES (?, ?);", [rows.insertId, req.files[i].path], function(err, rows) {
            if (err) {throw err;}
          });
          console.log("O TERCEIRO array[" + i + "] de files é " + req.files[i].path);
        }
      }
      res.redirect('/feed');
    });
});


// app.get('/showPost', function(request, response/*, next*/) {
//   db.query("Select * From Post Order by idPost DESC;", function(err, result, fields) {
//     if (err) throw err;
//     //console.log(result);
//     console.log("Example Data Result 0: " + result[0].Media);
//     for (var i = 0; i < result.length; i++) {
//       console.log(result[i].idPost + " - " + result[i].Media);
//       // var mediaSrc = request.body.feedParagraph;
//       // var mediaSrc = document.getElementById('feedParagraph').value;
//       // console.log("mediaSrc: " + mediaSrc);
//     }
//     // getImageUrls('/Profile', function(err, images) {
//     //   if (!err) {
//     //     console.log('Images found', images.length);
//     //     console.log(images);
//     //   }
//     //   else {
//     //     console.log('ERROR', err);
//     //   }
//     // })
//     response.send(result);
//   });
//   //next();
// });

// app.get('/showPost', function(request, response/*, next*/) {
//   db.query("Select * From Media Group by idPostFK Order by idMedia DESC;", function(err, result, fields) {
//     if (err) {throw err;} else {
//     console.log("RESULT primeira query showpost: " + JSON.stringify(result));
//     console.log("Example Data Result 0: " + result[0].Media);
//     for (var i = 0; i < result.length; i++) {
//       console.log(result[i].idPostFK + " - " + result[i].Media);
//
//     db.query("Select Title From Post WHERE idPost = ?;", result[i].idPostFK, function(err, result, fields) {
//       if (err) {throw err;} else {
//         console.log("RESULT segunda query showpost: " + JSON.stringify(result[0].Title));
//         console.log(result);
//       }
//     });
//   }
//
//   }
//     console.log("O super result é: " + JSON.stringify(result));
//     response.send(result);
//   });
//   //next();
// });

app.get('/showPost', function(request, response/*, next*/) {
  db.query("Select * From Media m JOIN Post p ON (m.idPostFK = p.idPost) Group by idPostFK Order by idMedia DESC;", function(err, result, fields) {
    if (err) {throw err;} else {
    console.log("RESULT primeira query showpost: " + JSON.stringify(result));
    console.log("Example Data Result 0: " + result[0].Media);
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].idPostFK + " - " + result[i].Media);
  }
  }
    console.log("O super result é: " + JSON.stringify(result));
    response.send(result);
  });
});

// app.get('/issue/:id', middleware.authenticationMiddleware, function(request, response) {
//   db.query("Select * From Post WHERE idPost = ?;", [request.params.id], function(err, result, fields) {
//     if (err) throw err;
//     console.log(result)
//     response.render('issue', {issue: result[0]});
//   });
// });

app.get('/issue/:id', middleware.authenticationMiddleware, function(request, response) {
  db.query("Select * From Post p JOIN Media m ON (p.idPost = m.idPostFK) WHERE idPost = ?;", [request.params.id], function(err, result, fields) {
    if (err) throw err;
    console.log("O issue result é: " + JSON.stringify(result));
    response.render('issue', {issue: result});
  });
});

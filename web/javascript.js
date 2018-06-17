

function getData(){
  $.getJSON('/all', show);

function show(data){
  var key = Object.keys(data);
  }
}
  getData();



//   var but = document.getElementById('submit');
//
//   but.onclick = function send(){
//
//     var admin = document.getElementsByName('admin').value;
//     var name = document.getElementById('name').value;
//     var age = document.getElementById('age').value;
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;
//
//
//     console.log(admin);
//     console.log(name);
//     console.log(age);
//     console.log(email);
//     console.log(password);
//
//     $.getJSON('/user/'+name+'/'+admin+'/'+age+'/'+email+'/'+password, end);
//
// function end(data){
//   console.log(data);
// }
// }

function PwValidate() {
  if (document.getElementById('password').value != document.getElementById('confPassword').value) {
    AlertPwDontMatch.innerHTML = "Passwords don't match!";
  } else {
    AlertPwDontMatch.innerHTML = "";
  }
}

  function goToIssue(id) {
    return function() {
      window.location.href = "/issue/" + id;
    }
  }


function showPost() {

  //DISPLAY THE POSTED PICTURE WITH INFO
  $.getJSON('/showPost', success); //GET THE RESULT FROM THIS ROUTE AND EXECUTES THE FUNCTION 'SUCCESS'
  function success(data) {
    for (var i = 0; i < data.length; i++) {

      var title = document.createElement('h5');
      var a = document.createElement('a');
      var img = document.createElement('img');
      var column = document.createElement('div');

      // var p = document.createElement('p');
      // p.innerHTML = data[i].Description;
      console.log(data);

      title.innerHTML = data[i].Title;
      var stringImg = data[i].Media.split('web\\').pop();

      // title.setAttribute('position', 'absolute');
      title.setAttribute('top', '5px');
      // title.setAttribute('left', '5px');
      title.setAttribute('align', 'center');


      $(a).attr('href','/issue/' + data[i].idPost); //add attribute with jQuery
      //$(a).attr('href','/issue/' + data[i].idPost);
      //a.setAttribute('href','issue.html');

      img.setAttribute('src', stringImg);
      console.log(stringImg);
      img.setAttribute('width', "450px");
      img.setAttribute('height', "450px");
      img.setAttribute('margin-left', "auto");
      img.setAttribute('margin-right', "auto");
      img.setAttribute('display', "block");
      img.setAttribute('onclick', "goToIssue(data[i].idPost)");

      // <a href="issue.html#id">
      // img.setAttribute('position', "relative");

      // p.setAttribute('id', 'feedParagraph');

      column.setAttribute('class', 'column');

      var div = document.getElementById('row');
      column.appendChild(title);
      // column.appendChild(img);
      column.appendChild(a);
      a.appendChild(img);
      // column.appendChild(p);
      div.appendChild(column);
    }
  }
}

// function issue() {
//
// //DISPLAY THE SELECTED POSTED PICTURE WITH INFO
// $.getJSON('/Issue', {id: window.location.hash}, success); //GET THE RESULT FROM THIS ROUTE AND EXECUTES THE FUNCTION 'SUCCESS'
//
// function success(data) {
//   console.log('oi');
//   for (var i = 0; i < data.length; i++) {
//
//
//
//     var title = document.createElement('h2');
//     var description = document.createElement('p');
//     var floor = document.createElement('p');
//     var room = document.createElement('p');
//     var media = document.createElement('p');
//     var image = document.createElement('img');
//
//     console.log(data);
//
//     title.innerHTML = data[i].Title;
//     description.innerHTML = "Description: " + data[i].Description;
//     floor.innerHTML = "Floor: " + data[i].Floor;
//     room.innerHTML = "Room: " + data[i].Room;
//
//     var stringImg = data[i].Media.split('web/').pop();
//     if (src == stringImg) {
//       media.innerHTML = "Media: " + stringImg;
//     } else {
//       media.innerHTML = "";
//     }
//     // media.innerHTML = "Media: " + data[i].Media.split('web/').pop();
//
//
//
//     // title.setAttribute('position', 'absolute');
//     title.setAttribute('id', 'issueTitle');
//     // title.setAttribute('top', '5px');
//     // title.setAttribute('left', '5px');
//
//     description.setAttribute('id', 'issueDescription');
//     floor.setAttribute('id', 'issueFloor');
//     room.setAttribute('id', 'issueRoom');
//     media.setAttribute('id', 'issueMedia');
//
//     image.setAttribute('id', 'issueImage');
//     image.setAttribute('src', stringImg);
//     console.log(stringImg);
//     image.setAttribute('width', "400px");
//     image.setAttribute('height', "400px");
//     // image.setAttribute('position', "relative");
//
//
//     // var titleId = document.getElementById('issueTitle');
//     var headerId = document.getElementById('headerImage');
//     var selectedImage = document.getElementById('selectedImage');
//
//     headerId.appendChild(title);
//     console.log(image, description, floor, room, media);
//     selectedImage.appendChild(image);
//     selectedImage.appendChild(description);
//     selectedImage.appendChild(floor);
//     selectedImage.appendChild(room);
//     selectedImage.appendChild(media);
//     }
//   }
// }


// if (isAuthenticated()){
//     $('<a id="home" href="/">Home</a>'+
//       '<a id="about" href="About.html">About</a>'+
//       '<a id="profile" href="Profile.html">Feed</a>'+
//       '<a id="post" href="/post">Make a Post</a>' +
//       '<a id="logout" href="/logout">Logout</a>').appendTo("#nav");
// }else {
//   $('<a id="home" href="/">Home</a>'+
//     '<a id="about" href="About.html">About</a>'+
//     '<a id="profile" href="Profile.html">Feed</a>'+
//     '<a id="signup" href="SignUp.html">SignUp</a>' +
//     '<a id="login" href="/login">LogIn</a>').appendTo("#nav");
// }


// console.log("A cookie" + document.cookie);

// function loggedIn() {
//   $.getJSON('/loggedIn', success);
//   function success(data) {
//     if (data == true){
//       console.log(data);
//         $('<a id="home" href="/">Home</a>'+
//           '<a id="about" href="About.html">About</a>'+
//           '<a id="profile" href="Profile.html">Feed</a>'+
//           '<a id="post" href="/post">Make a Post</a>' +
//           '<a id="logout" href="/logout">Logout</a>').appendTo("#nav");
//     }else {
//       $('<a id="home" href="/">Home</a>'+
//         '<a id="about" href="About.html">About</a>'+
//         '<a id="profile" href="Profile.html">Feed</a>'+
//         '<a id="signup" href="SignUp.html">SignUp</a>' +
//         '<a id="login" href="/login">LogIn</a>').appendChild("#nav");
//     }
//   }
// }


// function header() {
//   $.post('/login', success);
//   function success(data) {
//     if (data === 'done'){
//       console.log("header funtion data is: " + data);
//         $('<a id="home" href="/">Home</a>'+
//           '<a id="about" href="About.html">About</a>'+
//           '<a id="profile" href="Profile.html">Feed</a>'+
//           '<a id="post" href="/post">Make a Post</a>' +
//           '<a id="logout" href="/logout">Logout</a>').appendTo("#nav");
//     }else {
//       $('<a id="home" href="/">Home</a>'+
//         '<a id="about" href="About.html">About</a>'+
//         '<a id="profile" href="Profile.html">Feed</a>'+
//         '<a id="signup" href="SignUp.html">SignUp</a>' +
//         '<a id="login" href="/login">LogIn</a>').appendChild("#nav");
//     }
//   }
// }

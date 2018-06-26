

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

  function deleteMediaFromIssue(id) {
    return function() {
      window.location.href = "/delete/" + id;
    }
  }

  function FixedBroken(id) {
    return function() {
      window.location.href = "/FixedBroken/" + id;
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
      var status = document.createElement('p');
      var simpleDiv = document.createElement('div');
      var FixedBroken;


      console.log(data);

      if(data[i].Status == 1){
        title.innerHTML = data[i].Title;
        FixedBroken = "Fixed";
        status.innerHTML = FixedBroken;
        status.setAttribute('class', FixedBroken);
        status.setAttribute('style', "color:teal");
        status.setAttribute('align', 'center');
        // status.setAttribute('onclick', "filterSelection(" + FixedBroken + ")");
        simpleDiv.setAttribute('class', 'columnFixed');
      }
      else {
        title.innerHTML = data[i].Title;
        FixedBroken = "Broken";
        status.innerHTML = FixedBroken;
        status.setAttribute('class', FixedBroken);
        status.setAttribute('style', "color:red");
        status.setAttribute('align', 'center');
        // status.setAttribute('onclick', "filterSelection(" + FixedBroken + ")");
        simpleDiv.setAttribute('class', 'columnBroken');
      }

      var simpleDivClassFixed = document.getElementsByClassName('columnFixed');
      var simpleDivClassBroken = document.getElementsByClassName('columnBroken');

      function filterSelection(statusIssue) {
        console.log(statusIssue);
        if (statusIssue == 'Fixed') {
          // simpleDivClassFixed.style.display = "block";
          // simpleDivClassBroken.style.display = "none";
          simpleDivClassFixed.setAttribute('style', "display:block");
          simpleDivClassBroken.setAttribute('style', "display:none");
        } else if(statusIssue == 'Broken'){
          // simpleDivClassFixed.style.display = "none"
          // simpleDivClassBroken.style.display = "block";
          simpleDivClassFixed.setAttribute('style', "display:none");
          simpleDivClassBroken.setAttribute('style', "display:block");
        } else if(statusIssue == 'all'){
          // simpleDivClassFixed.style.display = "block";
          // simpleDivClassBroken.style.display = "block";
          simpleDivClassFixed.setAttribute('style', "display:block");
          simpleDivClassBroken.setAttribute('style', "display:block");
        }
      }

      var stringImg = data[i].Media.split('web/').pop();

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

      // Add active class to the current button (highlight it)
      // var btnContainer = document.getElementById("myBtnContainer");
      // var btns = btnContainer.getElementsByClassName("btn");
      // for (var i = 0; i < btns.length; i++) {
      //   btns[i].addEventListener("click", function(){
      //     var current = document.getElementsByClassName("active");
      //     current[0].className = current[0].className.replace(" active", "");
      //     this.className += " active";
      //   });
      // }

      column.setAttribute('class', 'column');

      var div = document.getElementById('row');
      column.appendChild(simpleDiv);
      simpleDiv.appendChild(title);
      simpleDiv.appendChild(a);
      a.appendChild(img);
      simpleDiv.appendChild(status);
      div.appendChild(column);
    }
  }
}

function showFixed() {

  //DISPLAY THE POSTED PICTURE WITH INFO
  $.getJSON('/Fixed', success); //GET THE RESULT FROM THIS ROUTE AND EXECUTES THE FUNCTION 'SUCCESS'
  function success(data) {
    for (var i = 0; i < data.length; i++) {

      var title = document.createElement('h5');
      var a = document.createElement('a');
      var img = document.createElement('img');
      var column = document.createElement('div');
      var status = document.createElement('p');
      var simpleDiv = document.createElement('div');
      var FixedBroken;


      console.log(data);

      if(data[i].Status == 1){
        title.innerHTML = data[i].Title;
        FixedBroken = "Fixed";
        status.innerHTML = FixedBroken;
        status.setAttribute('class', FixedBroken);
        status.setAttribute('style', "color:teal");
        status.setAttribute('align', 'center');
        // status.setAttribute('onclick', "filterSelection(" + FixedBroken + ")");
        simpleDiv.setAttribute('class', 'columnFixed');
      }
      else {
        title.innerHTML = data[i].Title;
        FixedBroken = "Broken";
        status.innerHTML = FixedBroken;
        status.setAttribute('class', FixedBroken);
        status.setAttribute('style', "color:red");
        status.setAttribute('align', 'center');
        // status.setAttribute('onclick', "filterSelection(" + FixedBroken + ")");
        simpleDiv.setAttribute('class', 'columnBroken');
      }

      var simpleDivClassFixed = document.getElementsByClassName('columnFixed');
      var simpleDivClassBroken = document.getElementsByClassName('columnBroken');

      function filterSelection(statusIssue) {
        console.log(statusIssue);
        if (statusIssue == 'Fixed') {
          // simpleDivClassFixed.style.display = "block";
          // simpleDivClassBroken.style.display = "none";
          simpleDivClassFixed.setAttribute('style', "display:block");
          simpleDivClassBroken.setAttribute('style', "display:none");
        } else if(statusIssue == 'Broken'){
          // simpleDivClassFixed.style.display = "none"
          // simpleDivClassBroken.style.display = "block";
          simpleDivClassFixed.setAttribute('style', "display:none");
          simpleDivClassBroken.setAttribute('style', "display:block");
        } else if(statusIssue == 'all'){
          // simpleDivClassFixed.style.display = "block";
          // simpleDivClassBroken.style.display = "block";
          simpleDivClassFixed.setAttribute('style', "display:block");
          simpleDivClassBroken.setAttribute('style', "display:block");
        }
      }

      var stringImg = data[i].Media.split('web/').pop();

      title.setAttribute('top', '5px');
      title.setAttribute('align', 'center');


      $(a).attr('href','/issue/' + data[i].idPost);

      img.setAttribute('src', stringImg);
      console.log(stringImg);
      img.setAttribute('width', "450px");
      img.setAttribute('height', "450px");
      img.setAttribute('margin-left', "auto");
      img.setAttribute('margin-right', "auto");
      img.setAttribute('display', "block");
      img.setAttribute('onclick', "goToIssue(data[i].idPost)");


      column.setAttribute('class', 'column');

      var div = document.getElementById('row');
      column.appendChild(simpleDiv);
      simpleDiv.appendChild(title);
      simpleDiv.appendChild(a);
      a.appendChild(img);
      simpleDiv.appendChild(status);
      div.appendChild(column);
    }
  }
}

function showBroken() {

  //DISPLAY THE POSTED PICTURE WITH INFO
  $.getJSON('/Broken', success); //GET THE RESULT FROM THIS ROUTE AND EXECUTES THE FUNCTION 'SUCCESS'
  function success(data) {
    for (var i = 0; i < data.length; i++) {

      var title = document.createElement('h5');
      var a = document.createElement('a');
      var img = document.createElement('img');
      var column = document.createElement('div');
      var status = document.createElement('p');
      var simpleDiv = document.createElement('div');
      var FixedBroken;


      console.log(data);

      if(data[i].Status == 1){
        title.innerHTML = data[i].Title;
        FixedBroken = "Fixed";
        status.innerHTML = FixedBroken;
        status.setAttribute('class', FixedBroken);
        status.setAttribute('style', "color:teal");
        status.setAttribute('align', 'center');
        // status.setAttribute('onclick', "filterSelection(" + FixedBroken + ")");
        simpleDiv.setAttribute('class', 'columnFixed');
      }
      else {
        title.innerHTML = data[i].Title;
        FixedBroken = "Broken";
        status.innerHTML = FixedBroken;
        status.setAttribute('class', FixedBroken);
        status.setAttribute('style', "color:red");
        status.setAttribute('align', 'center');
        // status.setAttribute('onclick', "filterSelection(" + FixedBroken + ")");
        simpleDiv.setAttribute('class', 'columnBroken');
      }

      var simpleDivClassFixed = document.getElementsByClassName('columnFixed');
      var simpleDivClassBroken = document.getElementsByClassName('columnBroken');

      function filterSelection(statusIssue) {
        console.log(statusIssue);
        if (statusIssue == 'Fixed') {
          // simpleDivClassFixed.style.display = "block";
          // simpleDivClassBroken.style.display = "none";
          simpleDivClassFixed.setAttribute('style', "display:block");
          simpleDivClassBroken.setAttribute('style', "display:none");
        } else if(statusIssue == 'Broken'){
          // simpleDivClassFixed.style.display = "none"
          // simpleDivClassBroken.style.display = "block";
          simpleDivClassFixed.setAttribute('style', "display:none");
          simpleDivClassBroken.setAttribute('style', "display:block");
        } else if(statusIssue == 'all'){
          // simpleDivClassFixed.style.display = "block";
          // simpleDivClassBroken.style.display = "block";
          simpleDivClassFixed.setAttribute('style', "display:block");
          simpleDivClassBroken.setAttribute('style', "display:block");
        }
      }

      var stringImg = data[i].Media.split('web/').pop();

      title.setAttribute('top', '5px');
      title.setAttribute('align', 'center');


      $(a).attr('href','/issue/' + data[i].idPost);

      img.setAttribute('src', stringImg);
      console.log(stringImg);
      img.setAttribute('width', "450px");
      img.setAttribute('height', "450px");
      img.setAttribute('margin-left', "auto");
      img.setAttribute('margin-right', "auto");
      img.setAttribute('display', "block");
      img.setAttribute('onclick', "goToIssue(data[i].idPost)");


      column.setAttribute('class', 'column');

      var div = document.getElementById('row');
      column.appendChild(simpleDiv);
      simpleDiv.appendChild(title);
      simpleDiv.appendChild(a);
      a.appendChild(img);
      simpleDiv.appendChild(status);
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

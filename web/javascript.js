

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

function showPost() {

  //DISPLAY THE POSTED PICTURE WITH INFO
  $.getJSON('/showPost', success); //GET THE RESULT FROM THIS ROUTE AND EXECUTES THE FUNCTION 'SUCCESS'

  function success(data) {
    for (var i = 0; i < data.length; i++) {

      var title = document.createElement('h5');
      var img = document.createElement('img');
      var column = document.createElement('div');

      console.log(data);

      title.innerHTML = data[i].Title;
      var stringImg = data[i].Media.split('web/').pop();

      // title.setAttribute('position', 'absolute');
      title.setAttribute('top', '5px');
      title.setAttribute('left', '5px');

      img.setAttribute('src', stringImg);
      img.setAttribute('width', "400px");
      img.setAttribute('height', "400px");
      // img.setAttribute('position', "relative");

      column.setAttribute('class', 'column');

      var div = document.getElementById('row');
      column.appendChild(title);
      column.appendChild(img);
      div.appendChild(column);
    }
  }
}

// function person(name, age, address, mail, password, confPassword) {
//   this.name = name;
//   this.age = age;
//   this.address = address;
//   this.mail = mail;
//   this.password = password;
//   this.confPassword = confPassword;
// }
//
// function createperson() {
//
//   if (document.getElementById('password').value === document.getElementById('confPassword').value) {
//     name = document.getElementById('name').value;
//     age = document.getElementById('age').value;
//     address = document.getElementById('address').value;
//     mail = document.getElementById('mail').value;
//     password = document.getElementById('password').value;
//     confPassword = document.getElementById('confPassword').value;
//   } else {
//     alert('passwords dont match');
//   }
//
//   var obj = new person(name, age, address, mail, password, confPassword);
//   console.log(obj);
// }

// function getData(){
//
//   $.getJSON('/all', show);
//
// function show(data){
//
//   var key = Object.keys(data);
//
//   var game = key[3];
//   var year = data[game];
//   console.log(game);
//   console.log(year);
//   document.getElementById('game').innerHTML = game +" "+ year;
// }
// }
//
//   getData();


/////////////////////////////////////////////////////////////////////
      // Menu-toggle button

      $(document).ready(function() {
            $(".menu-icon").on("click", function() {
                  $("nav ul").toggleClass("showing");
            });
      });

      // Scrolling Effect

      $(window).on("scroll", function() {
            if($(window).scrollTop()) {
                  $('nav').addClass('black');
            }

            else {
                  $('nav').removeClass('black');
            }
      })

/////////////////////////////////////////////////////////////////////
  var but = document.getElementById('submit');

  but.onclick = function send(){

    var admin = document.getElementById('admin').value;
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    console.log(admin, name, age, email, password);

    $.getJSON('/user/:'+admin+'/:'+name+'/:'+age+'/:'+email+'/:'+password+'/', end);

function end(data){
  console.log(data);
}
}

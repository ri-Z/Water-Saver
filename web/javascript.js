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

function getData(){
  $.getJSON('/all', show);

function show(data){
  var key = Object.keys(data);
  }
}
  getData();


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
    // if (document.getElementById('admin').checked == 0) {
    //   var admin = "0";
    // } else {
    //   var admin = "1";
    // }
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    console.log(admin);
    console.log(name);
    console.log(age);
    console.log(email);
    console.log(password);

    $.getJSON('/user/'+name+'/'+admin+'/'+age+'/'+email+'/'+password, end);

function end(data){
  console.log(data);
}

// similar behavior as an HTTP redirect
//window.location.replace("feedPage.html");

// similar behavior as clicking on a link
// window.location.href = "feedPage.html";
// document.getElementById('data').innerHTML = data;
}

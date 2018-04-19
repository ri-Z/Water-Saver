function person(name, age, address, mail, password, confPassword) {
  this.name = name;
  this.age = age;
  this.address = address;
  this.mail = mail;
  this.password = password;
  this.confPassword = confPassword;
}

function createperson() {

  if (document.getElementById('password').value === document.getElementById('confPassword').value) {
    name = document.getElementById('name').value;
    age = document.getElementById('age').value;
    address = document.getElementById('address').value;
    mail = document.getElementById('mail').value;
    password = document.getElementById('password').value;
    confPassword = document.getElementById('confPassword').value;
  } else {
    alert('passwords dont match');
  }

  var obj = new person(name, age, address, mail, password, confPassword);
  console.log(obj);
}

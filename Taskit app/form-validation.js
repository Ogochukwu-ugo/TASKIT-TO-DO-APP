//Validation of Forms

/*function validated() {
    
    
    let username = document.forms["form"]["userName"].value;
    let email = document.forms["form"]["email"].value;
    let password = document.forms["form"]["password"].value;

    
    if (username.value == ' '  && email.value == ' '  && password.value == ' ') {
        document.getElementById("result").innerHTML = input.validationMessage
    } else {
        const form = document.getElementById("form");

  
   

   const payLoad = new FormData()
   payLoad.append('userName', 'Sandy');
    

   console.log(payLoad)

   fetch('https://todo-app-bc.herokuapp.com/api/v1/users/signup', {
      method: "POST",
      body: payLoad,

   })
   .then(res => res.json())
   .then(data => console.log(data))
   .catch(err => console.log(err))
  
       
    }
        
    
    
    
}*/
// Fecthing API for signup

/*form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch("https://todo-app-bc.herokuapp.com/api/v1/users/signup", {
    method: "POST",
    body: formData,
    
  })
    .then((res) => res.json();)

    .then((data) => console.log(data, "dave"))
    .catch((err) => console.log(err, "fred"));
};*/


//Sign Up Validation


const register = document.getElementById("form");
    register.onsubmit = () => {
    e.preventDefault();
  var userName = document.getElementById("userName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;


  fetch("https://todo-app-bc.herokuapp.com/api/v1/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        userName: userName,
        email: email,
        password: password,
        }),

    })

    .then((res) => {
        return res.json();
    } )
    .then((data) => { 
        if (data != null) {
            window.location.href = './login.html'
        }
        console.log(data);
    })    
    .catch((err) => console.log(err));
}  



//Login Validation//

/*const login = document.getElementById("loginForm");
login.onsubmit = (e) => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch("https://todo-app-bc.herokuapp.com/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        email: email,
        password: password,
        authorization: 'bearer-token',
        }),

    })

     .then((res) => {
        return res.json();
    } )
    .then((data) => { 
        console.log(data);
       
         //navigating to home page//
         window.location.href="home.html";

    })    
    .catch((err) => console.log(err));
   
}*/



var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = './home.html'
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://todo-app-bc.herokuapp.com/api/v1/users/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "email": email,
    "password": password
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      if (objects['status'] == 'ok') {
        localStorage.setItem("jwt", objects['accessToken']);
        Swal.fire({
            text: objects['message'],
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './home.html';
            }
          });  
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}



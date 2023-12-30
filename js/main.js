/* GLOBAL */
var form = document.getElementById("form");
var allInputs = document.querySelectorAll(".form-control");
var nameRegex = /^[A-Z][a-z ]{3,20}$/;
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passwordRegex = /^[A-Za-z]\w{8,15}$/;
var newUser = {};

/* LOGIN PAGE*/
var loginForm = document.querySelector(".login-form");
var emailLogin = document.querySelector("#emailLogin");
var passwordLogin = document.querySelector("#passwordLogin");
var loginBtn = document.querySelector("#loginBtn");
var registerLink = document.querySelector("#registerLink");

/* Register Page */
var loginLink;
var nameRegister;
var emailRegister;
var passwordRegister;
var registerBtn;

/* LOGGEN IN PAGE */
var logOut = document.querySelector("#logOut");
var newForm = document.querySelector("#newForm");

/*
1- register

*/

// To prevent Form Default
function handleForm(e) {
  e.preventDefault();
}
form.addEventListener("submit", handleForm);
newForm.addEventListener("submit", handleForm);

// Check local storage
if (localStorage.getItem("userInfo") !== null) {
  // there is data
  var userInfo = JSON.parse(localStorage.getItem("userInfo"));
} else {
  // new user with no data
  var userInfo = [];
}

// To Create A new User
var createUser = function () {
  newUser = {
    userName: nameRegister.value,
    userEmail: emailRegister.value,
    userPassword: passwordRegister.value,
  };
  console.log(newUser);
  userInfo.push(newUser);
  console.log(userInfo);
  checkUser();
};

// To Check for regex before setting in local storage
var checkUser = function () {
  if (
    nameRegex.test(nameRegister.value) &&
    emailRegex.test(emailRegister.value) &&
    passwordRegex.test(passwordRegister.value)
  ) {
    var dataString = JSON.stringify(userInfo);
    localStorage.setItem("userInfo", dataString);

    nameRegister.value = "";
    emailRegister.value = "";
    passwordRegister.value = "";
  } else {
    // TODO: make notofication for the user to re input
  }
};

// To check for the Event Target (I targeted the button inner text)
document.addEventListener("click", function (e) {
  if (e.target.innerText == "Log Out") {
    form.classList.remove("d-none");
    newForm.innerHTML = "";
  } else if (e.target.innerText == "Register Now!") {
    registerPage();
  } else if (e.target.innerText == "Register") {
    registerBtn = document.querySelector("#registerBtn");
    createUser();
  } else if (e.target.innerText == "login Now!") {
    //NOT WORKING FOR SOME REASON
    console.log(loginLink);
    newForm.innerHTML = "";
    form.classList.remove("d-none");
  }
});

// Login Page
var userLogin = function () {
  for (var j = 0; j < userInfo.length; j++) {
    if (
      emailLogin.value == userInfo[j].userEmail &&
      passwordLogin.value == userInfo[j].userPassword
    ) {
      var loggedInPage = ` <nav class="navbar navbar-expand-lg shadow-lg">
      <div class="container-fluid">
        <a class="navbar-brand text-primary">Logged In</a>


      </div>
    </nav>
    <div
      class="loggedIn container d-flex flex-column align-items-center shadow p-5 my-5 w-auto h-auto"
    >
      <h3 class="text-light ">Welcome ${userInfo[j].userName}</h3>

      <button class="btn btn-outline-danger text-light btn-login px-5 my-4" id="logOut">
        Log Out
      </button>
    </div>`;
      newForm.innerHTML = loggedInPage;
      form.classList.add("d-none");
    }
  }
};
loginBtn.addEventListener("click", function () {
  userLogin();
  emailLogin.value = "";
  passwordLogin.value = "";
});

// Register Page
var registerPage = function () {
  var pageReg = ` <div
  class="register-form container d-flex flex-column justify-content-center align-items-center text-light shadow-lg my-5 py-2"
>
  <h1 class="py-2 position-relative">Register</h1>
  <div class="site-name w-50 d-flex flex-column justify-content-center">
    <label for="nameRegister" class="pb-2 fw-semibold">
      <i class="fa-solid fa-user"></i>
      Full Name</label
    >
    <input
      type="text"
      placeholder="First and Last Name"
      class="form-control"
      id="nameRegister"
    />
  </div>
  <div
    class="site-name w-50 d-flex flex-column justify-content-center my-2"
  >
    <label for="emailRegister" class="pb-2 fw-semibold">
      <i class="fa-solid fa-envelope"></i>
      Email</label
    >
    <input
      type="email"
      placeholder="Email"
      class="form-control"
      id="emailRegister"
    />
  </div>
  <div class="w-50 d-flex flex-column justify-content-center my-2">
    <label for="passwordRegister" class="pb-2 fw-semibold">
      <i class="fa-solid fa-lock"></i> Password</label
    >
    <input
      type="password"
      placeholder="password"
      class="form-control"
      id="passwordRegister"
    />
  </div>
  <button
    class="btn btn-outline-info btn-login px-5 my-4"
    id="registerBtn"
  >
    Register
  </button>
  <p>
    already have an account ?
    <a class="text-primary" id="loginLink">login Now!</a>
  </p>
</div>`;
  newForm.innerHTML = pageReg;
  form.classList.add("d-none");
  loginLink = document.querySelector("#loginLink");

  checkName();
  checkEmail();
  checkPass();
};

registerLink.addEventListener("click", function () {
  loginForm.classList.add("d-none");
});

// TODO: fix the check of regex inside the input ✔
var checkName = function () {
  nameRegister = document.querySelector("#nameRegister");
  nameRegister.addEventListener("blur", function () {
    if (nameRegex.test(nameRegister.value)) {
      nameRegister.classList.add("is-valid");
      nameRegister.classList.remove("is-invalid");
    } else {
      nameRegister.classList.remove("is-valid");
      nameRegister.classList.add("is-invalid");
    }
  });
};

var checkEmail = function () {
  emailRegister = document.querySelector("#emailRegister");

  emailRegister.addEventListener("blur", function () {
    if (emailRegex.test(emailRegister.value)) {
      emailRegister.classList.add("is-valid");
      emailRegister.classList.remove("is-invalid");
    } else {
      emailRegister.classList.remove("is-valid");
      emailRegister.classList.add("is-invalid");
    }
  });
};

var checkPass = function () {
  passwordRegister = document.querySelector("#passwordRegister");
  passwordRegister.addEventListener("blur", function () {
    if (passwordRegex.test(passwordRegister.value)) {
      passwordRegister.classList.add("is-valid");
      passwordRegister.classList.remove("is-invalid");
    } else {
      passwordRegister.classList.remove("is-valid");
      passwordRegister.classList.add("is-invalid");
    }
  });
};

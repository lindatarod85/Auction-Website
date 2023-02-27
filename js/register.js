import { baseURL } from "./settings/api.js";
import { containsSpecialChars } from "./components/formFunctions.js";
import { checkLength } from "./components/formFunctions.js";
import { validateEmail } from "./components/formFunctions.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const form = document.querySelector("form");
const username = document.querySelector("#username");
const usernameError = document.querySelector("#usernameError")
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError")
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError")
const successMessage = document.querySelector(".message-success");



form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  validateForm(event);
  form.reset();


userRegister(usernameValue, emailValue, passwordValue);

}



async function userRegister(username, email, password) {
    const url = baseURL + "api/v1/auction/auth/register";

    const data = JSON.stringify({ name: username, email: email, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      };


      try {
        const response = await fetch(url, options);
        const json = await response.json();
    
        console.log(json);

        if (json.credits) {

            successMessage.style.display = "block";           
           
           setTimeout (function(){
            location.href = "/login.html";
           } , 3000);

          }
        
      } catch(error){
        displayMessage("error", "An error occured", "message-container");
      }

    }


/* Registerform validation */

 function validateForm(event) {
    event.preventDefault();

 if(containsSpecialChars(username.value) || checkLength(username.value, 0) === false){
    usernameError.style.display = "block";
  } else{
    usernameError.style.display = "none";
  }

  if (validateEmail(email.value) === true && email.value.includes("noroff.no") ) {
    emailError.style.display = "none";
} else {
    emailError.style.display = "block";
}

if (checkLength(password.value, 8) === true) {
    passwordError.style.display = "none";
} else {
    passwordError.style.display = "block";
}
 }
 
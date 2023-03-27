import { baseURL } from "./settings/api.js";
import { checkLength, validateEmail } from "./components/formFunctions.js";
import displayMessage from "./components/displayMessage.js";
import { saveToken, saveUser, saveAvatar, saveCredits } from "./utils/storage.js";
import createMenu from "./components/createMenu.js";
import makeApiCall from "./utils/makeApiCall.js";


createMenu();

const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError")
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError")


form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  validateForm(event);
  form.reset();


doLogin(emailValue, passwordValue);
}
//Test makeApiCall
async function doLogin(email, password) {
  const url = baseURL + "api/v1/auction/auth/login";

  const json = JSON.stringify({email: email, password: password });

  const options = {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data, error} = await makeApiCall(url, options);
     
    if(error){
        return displayMessage("error", "An error occurred", ".message-container"); 
     } 

     if (data.name) {
      saveToken(data.accessToken);
      saveUser(data.name); 
      saveAvatar(data.avatar);
      saveCredits(data.credits);

     displayMessage("success", "You are successfully logged in", ".message-container");          
     
     setTimeout (function(){
      location.href = "/profile.html";
     } , 2000);
  }

     if (data.errors) {
      console.log("there was an error");
      displayMessage("error", "Username or password is wrong", ".message-container");

    }

  }



/*
async function doLogin(email, password) {
    const url = baseURL + "api/v1/auction/auth/login";

    const data = JSON.stringify({email: email, password: password });

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

        if (json.name) {
            saveToken(json.accessToken);
            saveUser(json.name); 
            saveAvatar(json.avatar);
            saveCredits(json.credits);

           displayMessage("success", "You are successfully logged in", ".message-container");          
           
           setTimeout (function(){
            location.href = "/profile.html";
           } , 3000);
        }

           if (json.errors) {
            console.log("there was an error");
            displayMessage("error", "Username or password is wrong", ".message-container");

          }
          
        
      } catch(error){

      }

    }
*/

/* Form validation */

 function validateForm(event) {
    event.preventDefault();

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
 


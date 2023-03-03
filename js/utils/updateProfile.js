import { baseURL } from "../settings/api.js";
import { myAuth} from "../settings/auth.js";
import displayMessage from "../components/displayMessage.js";
import {getUsername} from "../utils/storage.js";

const form = document.querySelector("form");
const profilePicture  = document.querySelector("#avatar");
const name = getUsername();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const profilPicValue = profilePicture.value.trim();

  //validateForm(event);
  form.reset();

updateAvatar(profilPicValue);

}

async function updateAvatar(image){

    const url = baseURL + "api/v1/auction/profiles/" + name + "/media";

    const data = JSON.stringify({ avatar: image });

    const options = {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: myAuth,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
    
        console.log(json);

        if (json.avatar) {

    displayMessage("success", "You successfully updated your profile picture", ".message-container");     
           
           setTimeout (function(){
            location.href = "/profile.html";
           } , 3000);

          }else{
            displayMessage("error", "An error occured", ".message-container");
          }
        
      } catch(error){
        
      }

    }
    

   

import { baseURL } from "../settings/api.js";
import { myAuth} from "../settings/auth.js";
import displayMessage from "../components/displayMessage.js";
import createMenu from "../components/createMenu.js";

createMenu();

const form = document.querySelector("form");
const title  = document.querySelector("#title");
//const deadline  = document.querySelector("#deadline-date");
const media1  = document.querySelector("#media1");
const media2  = document.querySelector("#media2");
const media3  = document.querySelector("#media3");
const media4  = document.querySelector("#media4");
const description  = document.querySelector("#description");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

const titleValue = title.value.trim();
const deadlineValue = new Date();
const media1Value = media1.value.trim();
const media2Value = media2.value.trim();
const media3Value = media3.value.trim();
const media4Value = media4.value.trim();
const descriptionValue = description.value.trim();

  console.log(event);

  //validateForm(event);
  form.reset();

addListing(titleValue, deadlineValue, media1Value, media2Value, media3Value, media4Value, descriptionValue);

}

async function addListing(title, deadline, media1, media2, media3, media4, description){

    const url = baseURL + "api/v1/auction/listings/";

    const data = JSON.stringify({ title: title, endsAt: deadline, media: [media1, media2, media3, media4], description: description });

    const options = {
        method: "POST",
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

        if (json.title) {

    displayMessage("success", "You successfully Added Listing", ".message-container");     
           
           setTimeout (function(){
            location.href = "/profile.html";
           } , 3000);

          }else{
            displayMessage("error", "An error occured", ".message-container");
          }
        
      } catch(error){
        
      }

}


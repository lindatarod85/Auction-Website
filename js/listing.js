import { baseURL } from "./settings/api.js";
import { options } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import {getToken} from "./utils/storage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const detailContainer = document.querySelector(".listing-details");
const mediaGallery = document.querySelector(".media-gallery")

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const listingID = params.get("listingID");

const url = baseURL + "api/v1/auction/listings/" + listingID;


try{

    const response = await fetch(url, options)
const details = await response.json();

console.log(details);



function displayListing(){

    detailContainer.innerHTML += `
    <h1>${details.title}</h1>
    <img src="${details.media[0]}" />
    Description: ${details.description}
    <p>Ends At: ${details.endsAt}</p>
    `
}
displayListing();

// Only for logged in users

function restrictedContent(){
    const tokenKey = getToken();
   if(tokenKey){
         detailContainer.innerHTML +=`<div class="bid-container">
    <p class="view-bids">Bids: ${details._count.bids}</p>
    </div>`
}
}
restrictedContent();

//Gallery
details.media.forEach(function(media){
mediaGallery.innerHTML += `
<img src="${media}" />
`
});


}catch(error){
    displayMessage("error", "An error occured", ".message-container");
}






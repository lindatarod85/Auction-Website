import makeApiCall from "./utils/makeApiCall.js";
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

// Get Listing
async function getListing(){
     const {data, error} = await makeApiCall(url, options);

    if(error){
        displayMessage("error", "An error occured", ".message-container");
    }
        displayListing(data);
        console.log(data);
    }
    getListing();

    //Display Listing
    function displayListing(data){
        detailContainer.innerHTML += `
        <h1>${data.title}</h1>
        <img src="${data.media[0]}" />
        Description: ${data.description}
        <p>Ends At: ${data.endsAt}</p>
        `

    //Gallery
    data.media.forEach(function(media){
        mediaGallery.innerHTML += `
        <img src="${media}" />
        `
        });
        // Only for logged in users
        const tokenKey = getToken();
        if(tokenKey){
              detailContainer.innerHTML +=`<div class="bid-container">
         <p class="view-bids">Bids: ${data._count.bids}</p>
         </div>`
     };
    }







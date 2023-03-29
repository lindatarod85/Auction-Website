import makeApiCall from "./utils/makeApiCall.js";
import { baseURL } from "./settings/api.js";
import { options } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { changeMediaSrc } from "./utils/mediaGallery.js";
import { loggedInUsers } from "./utils/loggedIn.js";


createMenu();

const detailContainer = document.querySelector(".listing-details");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("listingID");
const url =
  baseURL + "api/v1/auction/listings/" + listingID + "?_bids=true&_seller=true";

// Get Listing
async function getListing() {

  const {data, error} = await makeApiCall(url, options);
  console.log(data);

  //Head Title
  document.title = "Auction Website | " + data.title;

  if(error || data?.errors?.[0]?.message){
    detailContainer.innerHTML="";
    return displayMessage("error", "An error occurred", ".message-container"); 
 }  
 displayListing(data);
}
getListing();

//Display Listing
export function displayListing(data) {
  let imageSrc = data.media[0];
  if (!data.media.length) {
    imageSrc = "images/image-not-available.png";
  }

  detailContainer.innerHTML="";

  detailContainer.innerHTML += `
        <div class="listing-image">
        <img class="main-img" src="${imageSrc}" alt="${data.title}" />
        <div class="media-gallery"></div>
        </div>
        <div class="listing-content">
        <h1>${data.title}</h1>
       <p><b>Item description:</b> ${data.description}</p>
        <p><b>Ends At:</b> ${data.endsAt}</p>
        <p class="view-make-bid">You need to <a href="/login.html">login</a> to view and make bids</p>
        <a class="back" href="/index.html"><i class="fa-solid fa-angles-left"></i> Back to Listings</a>
        </div>
        `;
      
  changeMediaSrc(data);
  loggedInUsers(data); 
}

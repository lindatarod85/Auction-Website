import makeApiCall from "./utils/makeApiCall.js";
import { baseURL } from "./settings/api.js";
import { options } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const listingsContainer = document.querySelector(".listings");

//Get Listings
async function getListings(){

  const url = baseURL + "api/v1/auction/listings";
  const {data, error} = await makeApiCall(url, options);

  if(error){
    displayMessage("error", "An error occured", ".message-container");
}
    displayListings(data);
}
getListings();

//Display Listings
function displayListings(data){
  data.forEach (function (listing){
    listingsContainer.innerHTML += `
    <a href="listing.html?listingID=${listing.id}">
    <div class="card" style="width: 18rem;">
    <img src="${listing.media[0]}" class="card-img-top listing-img" alt="product image">
    <div class="card-body">
      <h5 class="card-title">${listing.title}</h5>
      <p class="card-text">${listing.description}</p>
    </div>
    </div>
    </a>`
    });
}








  


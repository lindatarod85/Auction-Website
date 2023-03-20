import makeApiCall from "./utils/makeApiCall.js";
import { baseURL } from "./settings/api.js";
import { options } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { searchResults } from "./utils/searchResults.js";

createMenu();

export const listingsContainer = document.querySelector(".listings");

//Get Active Listings
async function getActiveListings(){

  const url = baseURL + "api/v1/auction/listings?_active=true";
  const {data, error} = await makeApiCall(url, options);
  console.log(data);

  if(error){
    displayMessage("error", "An error occured", ".message-container");
}
    
displayActiveListings(data);
searchResults(data);
    
}
getActiveListings();

//Display Active Listings
export function displayActiveListings(data){

  listingsContainer.innerHTML = "";

  data.forEach (function (listing){

    let imageSrc = listing.media[0];
    if(!listing.media.length){
      imageSrc = "https://placeimg.com/250/180/arch";
    }

    listingsContainer.innerHTML += `
    <a href="listing.html?listingID=${listing.id}">
    <div class="card" style="width: 18rem;">
    <img src=${imageSrc} class="card-img-top listing-img" alt="product image">
    <div class="card-body">
      <h3 class="card-title">${listing.title}</h3>
      <p class="card-text">Ends At: ${listing.endsAt}</p>
    </div>
    </div>
    </a>
    `
    });
}



  


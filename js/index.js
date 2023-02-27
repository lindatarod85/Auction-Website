import { baseURL } from "./settings/api.js";
import { options } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

createMenu();

try{
  const response = await fetch(`${baseURL}api/v1/auction/listings`, options)
  const data = await response.json();

  console.log(data);

  const listingsContainer = document.querySelector(".listings");

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

displayListings(data);


}catch(error){
  displayMessage("error", "An error occured", ".message-container");
}
 







  


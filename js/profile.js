import makeApiCall from "./utils/makeApiCall.js";
import { baseURL } from "./settings/api.js";
import { myAuth } from "./settings/auth.js";
import { options } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import {getUsername, getToken, getAvatar, getCredits} from "./utils/storage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const name = getUsername();
const profileHeader = document.querySelector(".profile-header");
const myListingsContainer = document.querySelector(".my-listings");
const myBidsContainer = document.querySelector(".my-bids");


//Get profile details
async function getProfile(){

    const url = baseURL + "api/v1/auction/profiles/" + name;
    const {data, error} = await makeApiCall(url, options);

    console.log(url);


    if(error){
        displayMessage("error", "An error occured", ".message-container");
    }
        displayProfile(data);
        console.log(data);
}
getProfile();

//Display profile details
function displayProfile(data){
profileHeader.innerHTML += `
<div class="profile">
<img src="${data.avatar}" />
<h1>Hello ${data.name}</h1>
</div>
<div class="profile-menu">
<a href="/updateProfile.html">Update Profile</a>
<a href="/addListing.html">Add Listing</a>
<div>My Credits: ${data.credits}</div>
</div>
`
};

//Get my Listings
async function getMyListings(){
    const url = baseURL + "api/v1/auction/profiles/" + name + "/listings";
    const {data, error} = await makeApiCall(url, options);

    console.log(data);
    if(error){
        displayMessage("error", "An error occured", ".message-container");
    }
    displayMyListings(data)
}
getMyListings();

// Display my Listings
function displayMyListings(data){

    data.forEach (function (listing){
        myListingsContainer.innerHTML += `
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

//Get my Bids
async function getMyBids(){
    const url = baseURL + "api/v1/auction/profiles/" + name + "/bids?_listings=true";
    const {data, error} = await makeApiCall(url, options);

    console.log(data);
    if(error){
        displayMessage("error", "An error occured", ".message-container");
    }
    displayMyBids(data)
}
getMyBids();

//Display my Bids
function displayMyBids(data){

    data.forEach (function (bid){
        myBidsContainer.innerHTML += `
        <a href="listing.html?listingID=${bid.listing.id}">
        <div class="card" style="width: 18rem;">
        <img src="${bid.listing.media[0]}" class="card-img-top listing-img" alt="product image">
        <div class="card-body">
          <h5 class="card-title">${bid.listing.title}</h5>
          <p class="card-text">Ends At: ${bid.listing.endsAt}</p>
          <div class="bid-info">
          <p>Bidders Name: ${bid.bidderName}</p>
          <p>Bid amount: ${bid.amount}</p>
        <p>Bid made: ${bid.created}</p>
        </div>
        </div>
        </div>
        </a>`
        });


}


/*
function displayActiveListings(data){

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
 */
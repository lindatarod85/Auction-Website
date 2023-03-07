import makeApiCall from "./utils/makeApiCall.js";
import { baseURL } from "./settings/api.js";
import { options } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import {getUsername, getAvatar, getCredits} from "./utils/storage.js";
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

    displayMyListings(data)
    }
}
getMyListings();

// Display my Listings
function displayMyListings(data){

myListingsContainer.innerHTML+= ``;
}

//Get my Bids
async function getMyBids(){
    const url = baseURL + "api/v1/auction/profiles/" + name + "/bids";
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
myBidsContainer.innerHTML+=``;

}



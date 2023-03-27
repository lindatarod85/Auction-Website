import makeApiCall from "./utils/makeApiCall.js";
import { baseURL } from "./settings/api.js";
import { options } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import {getUsername} from "./utils/storage.js";
import createMenu from "./components/createMenu.js";
import { clickViewListings, displayMyListings } from "./utils/displayMyListings.js";
import { clickViewBids, displayMyBids } from "./utils/displayMyBids.js";

createMenu();

const name = getUsername();
const profileHeader = document.querySelector(".profile-header");

if(!name){
    location.href = "/index.html";
}

else{
   //Get profile details
async function getProfile(){
    const url = baseURL + "api/v1/auction/profiles/" + name;
     const {data, error} = await makeApiCall(url, options);
     
     if(error){
         profileHeader.innerHTML="";
         return displayMessage("error", "An error occurred", ".message-container"); 
      } 
 
         displayProfile(data);
         console.log(data);
 }
 getProfile();
 
 profileHeader.innerHTML="";
 
 //Display profile details
 function displayProfile(data){
 
     let imageSrc = data.avatar;
     if(data.avatar === "" || data.avatar === null ){
       imageSrc = "/images/avatar.png";
     }
 
 profileHeader.innerHTML += `
 <div class="profile">
 <img src="${imageSrc}" />
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
         return displayMessage("error", "An error occurred", ".message-container"); 
      } 
 
     displayMyListings(data);
     clickViewListings(data);
 }
 getMyListings();
 
 
 //Get my Bids
 async function getMyBids(){
     const url = baseURL + "api/v1/auction/profiles/" + name + "/bids?_listings=true";
     const {data, error} = await makeApiCall(url, options);
 
     console.log(data);
     if(error){
         displayMessage("error", "An error occured", ".message-container");
     }
     displayMyBids(data);
     clickViewBids(data);
 }
 getMyBids(); 


}


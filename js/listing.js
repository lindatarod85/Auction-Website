import makeApiCall from "./utils/makeApiCall.js";
import { baseURL } from "./settings/api.js";
import { options } from "./settings/auth.js";
import { myAuth } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import {getToken} from "./utils/storage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const detailContainer = document.querySelector(".listing-details");
const mediaGallery = document.querySelector(".media-gallery")
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("listingID");
const url = baseURL + "api/v1/auction/listings/" + listingID + "?_bids=true&_seller=true";

// Get Listing
async function getListing(){
     const {data, error} = await makeApiCall(url, options);

     //Head Title
     document.title = "Auction Website | " + data.title;

    if(error){
        displayMessage("error", "An error occured", ".message-container");
    }
        displayListing(data);
        //console.log(data);
        //console.log(data.id);
    }
    getListing();

    //Display Listing
    function displayListing(data){

      let imageSrc = data.media[0];
      if(!data.media.length){
        imageSrc = "https://placeimg.com/250/180/arch";
      }
      
        detailContainer.innerHTML += `
        <div>
        <img class="main-img" src="${imageSrc}" alt="${data.title}" />
        </div>
        <div class="listing-content">
        <h1>${data.title}</h1>
        Description: ${data.description}
        <p>Ends At: ${data.endsAt}</p>
        </div>
        `
        console.log(data);
    
    //Gallery
    data.media.forEach(function(media){
        mediaGallery.innerHTML += `
        <img class="gallery-img" src="${media}" alt="" />
        `
        });
         
        //Change image src
    const galleryImage = document.querySelector(".gallery-img");
    const mainImage = document.querySelector(".main-img");
    let galleryImageSrc = galleryImage.src;
      let mainImageSrc = mainImage.src;
    galleryImage.addEventListener("click", function(){
      mainImageSrc = galleryImageSrc;
    });

        // Only for logged in users
        const tokenKey = getToken();
        if(tokenKey){

        const allBids = data.bids;
       const highestBid = Math.max(...allBids.map(o => o.amount))
       console.log(highestBid); 

              document.querySelector(".listing-content").innerHTML +=`<div class="bid-container">
         <p class="view-bids">Bids: ${data._count.bids}</p>
         <p>Highest Bid: ${highestBid}</p>
         <p>Seller: ${data.seller.name}</p>
        <form>
        <label for="bid">Bid On This Item</label><br>
        <input id="bid" type="text" />
        <button type="submit">Send Bid</button>
        </form>
        <div class="bid-message"></div>
         </div>`
     };
     
     //Make Bid

     const form = document.querySelector("form");
     const bidInput = document.querySelector("#bid");
    if(tokenKey){
     form.addEventListener("submit", submitForm);

       function submitForm(event) {
        event.preventDefault();

        const bidInputValue = parseInt(bidInput.value);

        //validateForm(event);
        form.reset();

        makeBid(bidInputValue);

       }
      }

       async function makeBid(bid){

        const url = baseURL + "api/v1/auction/listings/" + data.id + "/bids";

        const dataStr = JSON.stringify({ amount: bid });

        const options = {
            method: "POST",
            body: dataStr,
            headers: {
              "Content-Type": "application/json",
              Authorization: myAuth,
            },
          };

          try {
            const response = await fetch(url, options);
            const json = await response.json();
        
            console.log(json);
         
            if(json.created){
                const bidSuccess = "You successfully sent a bid";
                displayMessage("success", bidSuccess, ".bid-message"); 
              } else{
                const bidError = json.errors[0].message;
                displayMessage("error", bidError, ".bid-message");
              }
            
          } catch(error){  
            console.log(error);
            displayMessage("error", "An error ocurred", ".message-container");
          }
       }
    }

   
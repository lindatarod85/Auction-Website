const myListingsContainer = document.querySelector(".my-listings");
const viewMore = document.querySelector(".view-more-listings");

export function displayMyListings(data){
    const listing = data;

        for(let i = 0; i < listing.length; i++){
            if (i === 4) {
                break;
              }

              
              let imageSrc = listing[i].media[0];
    if(!listing[i].media.length){
      imageSrc = "https://placeimg.com/250/180/arch";
    }
               
            
            myListingsContainer.innerHTML += `
            <a href="listing.html?listingID=${listing[i].id}">
            <div class="card" style="width: 18rem;">
            <img src="${imageSrc}" class="card-img-top listing-img" alt="product image">
            <div class="card-body">
              <h5 class="card-title">${listing[i].title}</h5>
              <p class="card-text">Ends At: ${listing[i].endsAt}</p>
            </div>
            </div>
            </a>
          `
        }
    }

    export function clickViewListings(data){
        const listing = data;
        viewMore.addEventListener("click", function(){
            for(let i = 4; i < listing.length; i++){

                let imageSrc = listing[i].media[0];
                if(!listing[i].media.length){
                  imageSrc = "https://placeimg.com/250/180/arch";
                }

                myListingsContainer.innerHTML += `
                <a href="listing.html?listingID=${listing[i].id}">
                <div class="card" style="width: 18rem;">
                <img src="${imageSrc}" class="card-img-top listing-img" alt="product image">
                <div class="card-body">
                  <h5 class="card-title">${listing[i].title}</h5>
                  <p class="card-text">Ends At: ${listing[i].endsAt}</p>
                </div>
                </div>
                </a>
              `
            }
        })
    }


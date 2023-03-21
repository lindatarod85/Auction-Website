
const myListingsContainer = document.querySelector(".my-listings");
const viewMore = document.querySelector(".view-more-listings");

 
export function displayMyListings(data){
    const listings = data;
    viewMore.style.display = "none";

    if(listings.length === 0){
      return myListingsContainer.innerHTML += `<div class="no-listings">you haven't added any listings yet.</div>`
    }

        for(let i = 0; i < listings.length; i++){

          if(i => 5){
            viewMore.style.display = "block";
          }

            if (i === 4) {
                break;
              } 


              let imageSrc = listings[i].media[0];
    if(!listings[i].media.length){
      imageSrc = "https://placeimg.com/250/180/arch";
    }
            
            myListingsContainer.innerHTML += `
            <a href="listing.html?listingID=${listings[i].id}">
            <div class="card" style="width: 18rem;">
            <img src="${imageSrc}" class="card-img-top listing-img" alt="product image">
            <div class="card-body">
              <h5 class="card-title">${listings[i].title}</h5>
              <p class="card-text">Ends At: ${listings[i].endsAt}</p>
            </div>
            </div>
            </a>
          `
        }
    }

    export function clickViewListings(data){
        const listings = data;
        viewMore.addEventListener("click", function(){
            for(let i = 4; i < listings.length; i++){

                let imageSrc = listings[i].media[0];
                if(!listings[i].media.length){
                  imageSrc = "https://placeimg.com/250/180/arch";
                }

               if (myListingsContainer.children.length === listings.length) {
                    viewMore.style.display = "none";
                  }

                myListingsContainer.innerHTML += `
                <a href="listing.html?listingID=${listings[i].id}">
                <div class="card" style="width: 18rem;">
                <img src="${imageSrc}" class="card-img-top listing-img" alt="product image">
                <div class="card-body">
                  <h5 class="card-title">${listings[i].title}</h5>
                  <p class="card-text">Ends At: ${listings[i].endsAt}</p>
                </div>
                </div>
                </a>
              `
            }
        })
    }


    /*function genHTML(data){
    let imageSrc = "https://placeimg.com/250/180/arch";
    if(data[i].media.length){
      imageSrc = data[i].media[0]
    }
  
    const html = `
      <a href="listing.html?listingID=${data[i].id}">
        <div class="card" style="width: 18rem;">
          <img src="${imageSrc}" class="card-img-top listing-img" alt="product image" />
          <div class="card-body">
            <h5 class="card-title">${data[i].title}</h5>
            <p class="card-text">Ends At: ${data[i].endsAt}</p>
          </div>
        </div>
      </a>
    `
    return html;
  }

  export function displayMyListings(data){
   

        for(let i = 0; i < data.length; i++){
            if (i === 4) {
                break;
              }
              myListingsContainer.innerHTML += genHTML(data[i])
            }
        }

        export function clickViewListings(data){
            
            viewMore.addEventListener("click", function(){
                for(let i = 4; i < data.length; i++){
    
                    myListingsContainer.innerHTML += genHTML(data[i])
                }
            })
        }
*/


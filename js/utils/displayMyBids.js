const myBidsContainer = document.querySelector(".my-bids");
const viewMore = document.querySelector(".view-more-bids");


export function displayMyBids(data){
    const bid = data;

    for(let i = 0; i < bid.length; i++){
        if (i === 4) {
            break;
          }

        myBidsContainer.innerHTML += `
        <a href="listing.html?listingID=${bid[i].id}">
        <div class="card" style="width: 18rem;">
        <img src="${bid[i].listing.media[0]}" class="card-img-top listing-img" alt="product image">
        <div class="card-body">
          <h5 class="card-title">${bid[i].listing.title}</h5>
          <p class="card-text">Ends At: ${bid[i].listing.endsAt}</p>
          <div class="bid-info">
          <p>Bid amount: ${bid[i].amount}</p>
        <p>Bid made: ${bid[i].created}</p>
        </div>
        </div>
        </div>
        </a> `
    }
    }

    export function clickViewBids(data){
        const bid = data;

        viewMore.addEventListener("click", function(){
            for(let i = 4; i < bid.length; i++){

                let imageSrc = bid[i].listing.media[0];
                if(!bid[i].listing.media.length){
                  imageSrc = "https://placeimg.com/250/180/arch";
                }

                myBidsContainer.innerHTML += `
                <a href="listing.html?listingID=${bid[i].id}">
                <div class="card" style="width: 18rem;">
                <img src="${imageSrc}" class="card-img-top listing-img" alt="product image">
                <div class="card-body">
                  <h5 class="card-title">${bid[i].listing.title}</h5>
                  <p class="card-text">Ends At: ${bid[i].listing.endsAt}</p>
                  <div class="bid-info">
                  <p>Bid amount: ${bid[i].amount}</p>
                <p>Bid made: ${bid[i].created}</p>
                </div>
                </div>
                </div>
                </a> `
            }
        })
    }
 
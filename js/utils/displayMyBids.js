const myBidsContainer = document.querySelector(".my-bids");
const viewMore = document.querySelector(".view-more-bids");


export function displayMyBids(data){
    const bids = data;
    viewMore.style.display = "none";

    if(bids.length === 0){
      return myBidsContainer.innerHTML += `<div class="no-bids">you haven't made any bids yet.</div>`
    }

    for(let i = 0; i < bids.length; i++){

      if(i => 5){
        viewMore.style.display = "block";
      }

        if (i === 4) {
            break;
          }

        myBidsContainer.innerHTML += `
        <a href="listing.html?listingID=${bids[i].id}">
        <div class="card" style="width: 18rem;">
        <img src="${bids[i].listing.media[0]}" class="card-img-top listing-img" alt="product image">
        <div class="card-body">
          <h5 class="card-title">${bids[i].listing.title}</h5>
          <p class="card-text">Ends At: ${bids[i].listing.endsAt}</p>
          <div class="bid-info">
          <p>Bid amount: ${bids[i].amount}</p>
        <p>Bid made: ${bids[i].created}</p>
        </div>
        </div>
        </div>
        </a> `
    }
    }

    export function clickViewBids(data){
        const bids = data;

        viewMore.addEventListener("click", function(){
            for(let i = 4; i < bids.length; i++){

                let imageSrc = bids[i].listing.media[0];
                if(!bids[i].listing.media.length){
                  imageSrc = "https://placeimg.com/250/180/arch";
                }

                if (myBidsContainer.children.length === bids.length) {
                    viewMore.style.display = "none";
                  }

                myBidsContainer.innerHTML += `
                <a href="listing.html?listingID=${bids[i].id}">
                <div class="card" style="width: 18rem;">
                <img src="${imageSrc}" class="card-img-top listing-img" alt="product image">
                <div class="card-body">
                  <h5 class="card-title">${bids[i].listing.title}</h5>
                  <p class="card-text">Ends At: ${bids[i].listing.endsAt}</p>
                  <div class="bid-info">
                  <p>Bid amount: ${bids[i].amount}</p>
                <p>Bid made: ${bids[i].created}</p>
                </div>
                </div>
                </div>
                </a> `
            }
        })
    }
 
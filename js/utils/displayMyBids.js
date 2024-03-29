const myBidsContainer = document.querySelector(".my-bids");
const viewMore = document.querySelector(".view-more-bids");

export function displayMyBids(data) {
  const bids = data;
  viewMore.style.display = "none";

  if (bids.length === 0) {
    return (myBidsContainer.innerHTML += `<div class="no-bids">You haven't made any bids yet.</div>`);
  }

  for (let i = 0; i < bids.length; i++) {
    if (i >= 4) {
      viewMore.style.display = "inline-block";
    }

    if (i === 4) {
      break;
    }

    myBidsContainer.innerHTML += `
        <a href="listing.html?listingID=${bids[i].id}">
        <div class="card" style="width: 18rem;">
        <img src="${bids[i].listing.media[0]}" class="card-img-top listing-img" alt="product image">
        <div class="card-body">
          <h3 class="card-title">${bids[i].listing.title}</h3>
          <p class="card-text"><span>Ends At:</span> ${bids[i].listing.endsAt}</p>
          <div class="bid-info">
          <p>Bid amount: ${bids[i].amount}</p>
        <p>Bid made: ${bids[i].created}</p>
        </div>
        </div>
        </div>
        </a> `;
  }
}

export function clickViewBids(data) {
  const bids = data;

  viewMore.addEventListener("click", function () {
    for (let i = 4; i < bids.length; i++) {
      let imageSrc = bids[i].listing.media[0];
      if (!bids[i].listing.media.length) {
        imageSrc = "images/image-not-available.png";
      }

      if (myBidsContainer.children.length === bids.length) {
        viewMore.style.display = "none";
      }

      myBidsContainer.innerHTML += `
                <a href="listing.html?listingID=${bids[i].id}">
                <div class="card" style="width: 18rem;">
                <img src="${imageSrc}" class="card-img-top listing-img" alt="product image">
                <div class="card-body">
                  <h3 class="card-title">${bids[i].listing.title}</h3>
                  <p class="card-text"><span>Ends At:</span> ${bids[i].listing.endsAt}</p>
                  <div class="bid-info">
                  <p>Bid amount: ${bids[i].amount}</p>
                <p>Bid made: ${bids[i].created}</p>
                </div>
                </div>
                </div>
                </a> `;
    }
  });
}

const myListingsContainer = document.querySelector(".my-listings");
const viewMore = document.querySelector(".view-more-listings");

export function displayMyListings(data) {
  const listings = data;
  viewMore.style.display = "none";

  if (listings.length === 0) {
    return (myListingsContainer.innerHTML += `<div class="no-listings">You haven't added any listings yet.</div>`);
  }

  for (let i = 0; i < listings.length; i++) {
    if (i >= 4) {
      viewMore.style.display = "inline-block";
    }

    if (i === 4) {
      break;
    }

    let imageSrc = listings[i].media[0];
    if (!listings[i].media.length) {
      imageSrc = "images/image-not-available.png";
    }

    myListingsContainer.innerHTML += `
            <a href="listing.html?listingID=${listings[i].id}">
            <div class="card" style="width: 18rem;">
            <img src="${imageSrc}" class="card-img-top listing-img" alt="product image">
            <div class="card-body">
              <h3 class="card-title">${listings[i].title}</h3>
              <p class="card-text"><span>Ends At:</span> ${listings[i].endsAt}</p>
            </div>
            </div>
            </a>
          `;
  }
}

export function clickViewListings(data) {
  const listings = data;
  viewMore.addEventListener("click", function () {
    for (let i = 4; i < listings.length; i++) {
      let imageSrc = listings[i].media[0];
      if (!listings[i].media.length) {
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
                  <h3 class="card-title">${listings[i].title}</h3>
                  <p class="card-text"><span>Ends At:</span> ${listings[i].endsAt}</p>
                </div>
                </div>
                </a>
              `;
    }
  });
}

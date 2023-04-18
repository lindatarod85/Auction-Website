import { displayActiveListings } from "../index.js";
import displayMessage from "../components/displayMessage.js";
import { listingsContainer } from "../index.js";

export function searchResults(data) {
  const search = document.querySelector(".search");
  const messageContainer = document.querySelector(".message-container");

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim();

    listingsContainer.innerHTML = "";
    messageContainer.innerHTML = "";

    const filteredResults = data.filter(function (result) {
      if (
        result.title.toLowerCase().startsWith(searchValue) ||
        searchValue === ""
      ) {
        return true;
      }
    });

    noResults(filteredResults);
  };
}
function noResults(filteredResults) {
  if (filteredResults.length) {
    displayActiveListings(filteredResults);
  } else {
    displayMessage("filter", "No results were found", ".message-container");
  }
}

import { getToken } from "./storage.js";
import { baseURL } from "../settings/api.js";
import { myAuth } from "../settings/auth.js";
import displayMessage from "../components/displayMessage.js";

export function loggedInUsers(data) {
    const tokenKey = getToken();
    if (tokenKey) {
        const allBids = data.bids;
        const highestBid = Math.max(...allBids.map((o) => o.amount));
        console.log(highestBid);

        document.querySelector(".view-make-bid").style.display = "none";

        document.querySelector(
            ".listing-content"
        ).innerHTML += `<div class="bid-container">
         <p class="view-bids"><b>Bids:</b> ${data._count.bids}</p>
         <p><b>Highest Bid:</b> ${highestBid}</p>
         <p><b>Seller:</b> ${data.seller.name}</p>
        <form>
        <label for="bid"><b>Bid On This Item</b></label><br>
        <input id="bid" type="text" placeholder="Amount" />
        <button type="submit">Send Bid</button>
        </form>
        <div class="bid-message"></div>
         </div>`;
    }

    //Make Bid
    const form = document.querySelector("form");
    const bidInput = document.querySelector("#bid");
    if (tokenKey) {
        form.addEventListener("submit", submitForm);

        function submitForm(event) {
            event.preventDefault();

            const bidInputValue = parseInt(bidInput.value);

            form.reset();
            makeBid(bidInputValue);
        }
    }
    async function makeBid(bid) {
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

            if (json.created) {
                const bidSuccess = "You successfully sent a bid";
                displayMessage("success", bidSuccess, ".bid-message");
            } else {
                const bidError = json.errors[0].message;
                displayMessage("error", bidError, ".bid-message");
            }
        } catch (error) {
            console.log(error);
            displayMessage("error", "An error ocurred", ".message-container");
        }
    }
}

import { baseURL } from "./settings/api.js";
import { options } from "./settings/auth.js";
import displayMessage from "./components/displayMessage.js";
import {getUsername, getAvatar, getCredits} from "./utils/storage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const name = getUsername();

const url = baseURL + "api/v1/auction/profiles/" + name

try{

    const response = await fetch(url, options)
const results = await response.json();

console.log(results);

const profileHeader = document.querySelector(".profile-header");

profileHeader.innerHTML += `
<div class="profile">
<img src="${results.avatar}" />
<h1>Hello ${results.name}</h1>
</div>
<div class="profile-menu">
<a href="#">Update Profile</a>
<a href="#">Add Listing</a>
<div>My Credits: ${results.credits}</div>
</div>
`



}catch(error){
    displayMessage("error", "An error occured", ".message-container");
}


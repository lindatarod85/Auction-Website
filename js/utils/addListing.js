import { baseURL } from "../settings/api.js";
import { myAuth } from "../settings/auth.js";
import displayMessage from "../components/displayMessage.js";
import createMenu from "../components/createMenu.js";
import { checkLength } from "../components/formFunctions.js";
import makeApiCall from "./makeApiCall.js";
import { getUsername } from "./storage.js";

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const titleError = document.querySelector("#titleError");
const deadline = document.querySelector("#deadline-date");
const media1 = document.querySelector("#media1");
const media2 = document.querySelector("#media2");
const media3 = document.querySelector("#media3");
const media4 = document.querySelector("#media4");
const description = document.querySelector("#description");
const name = getUsername();

if (!name) {
  location.href = "/index.html";
} else {
  form.addEventListener("submit", submitForm);

  function submitForm(event) {
    event.preventDefault();

    const titleValue = title.value.trim();
    const deadlineValue = deadline.value.trim();
    const media1Value = media1.value.trim();
    const media2Value = media2.value.trim();
    const media3Value = media3.value.trim();
    const media4Value = media4.value.trim();
    const descriptionValue = description.value.trim();
    const mediaValue = [];

    // If input isn't empty, add them to the array
    if (media1Value !== "") {
      mediaValue.push(media1Value);
    }
    if (media2Value !== "") {
      mediaValue.push(media2Value);
    }
    if (media3Value !== "") {
      mediaValue.push(media3Value);
    }
    if (media4Value !== "") {
      mediaValue.push(media4Value);
    }

    validateForm(event);
    form.reset();

    addListing(titleValue, deadlineValue, mediaValue, descriptionValue);
  }

  async function addListing(title, deadline, media, description) {
    const url = baseURL + "api/v1/auction/listings/";

    const json = JSON.stringify({
      title: title,
      endsAt: deadline,
      media,
      description: description,
    });

    const options = {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
        Authorization: myAuth,
      },
    };

    const { data, error } = await makeApiCall(url, options);

    if (error) {
      return displayMessage("error", "An error occurred", ".message-container");
    }

    console.log(data);

    if (data.title) {
      displayMessage(
        "success",
        "You successfully Added Listing",
        ".message-container"
      );

      setTimeout(function () {
        location.href = "/profile.html";
      }, 2000);
    } else {
      displayMessage("error", data?.errors?.[0]?.message, ".message-container");
    }
  }
}

/* Validate Form */
function validateForm(event) {
  event.preventDefault();

  if (checkLength(title.value, 0) === true) {
    titleError.style.display = "none";
  } else {
    titleError.style.display = "block";
  }
}

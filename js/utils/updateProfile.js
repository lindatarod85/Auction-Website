import { baseURL } from "../settings/api.js";
import { myAuth } from "../settings/auth.js";
import displayMessage from "../components/displayMessage.js";
import { getUsername } from "../utils/storage.js";
import createMenu from "../components/createMenu.js";
import { checkLength } from "../components/formFunctions.js";
import makeApiCall from "./makeApiCall.js";

createMenu();

const form = document.querySelector("form");
const profilePicture = document.querySelector("#avatar");
const name = getUsername();

if (!name) {
  location.href = "/index.html";
} else {
  form.addEventListener("submit", submitForm);

  function submitForm(event) {
    const isValid = validateForm(event);

    if (!isValid) {
      return displayMessage(
        "error",
        "You need to provide a URL",
        ".message-container"
      );
    }

    const profilePicValue = profilePicture.value.trim();

    validateForm(event);
    form.reset();

    updateAvatar(profilePicValue);
  }

  async function updateAvatar(image) {
    const url = baseURL + "api/v1/auction/profiles/" + name + "/media";

    const json = JSON.stringify({ avatar: image });

    const options = {
      method: "PUT",
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

    if (data.avatar) {
      displayMessage(
        "success",
        "You successfully updated your profile picture",
        ".message-container"
      );

      setTimeout(function () {
        location.href = "/profile.html";
      }, 2000);
    }
  }
}

/* Form validation */
function validateForm(event) {
  event.preventDefault();

  if (checkLength(profilePicture.value, 0) === false) {
    return false;
  } else {
    return true;
  }
}

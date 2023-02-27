import { getToken } from "./utils/storage.js";
import {logoutButton} from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const menuContainer = document.querySelector("ul.navbar-nav");

  const token = getToken();

  let authLink = ` <li class="nav-item"> <a href="/" class="${
    pathname === "/" || pathname === "/.html" ? "active" : ""
  }">Login</a></li>`;

  if (token) {
    authLink = `<li class="nav-item"><a href="profile.html" class="${
      pathname === "/profile.html" ? "active" : ""
    }">Profile</a></li>
        <button id="logout">Logout ${username}</button>`;
  }

  if (pathname !== "/profile.html" && token) {
    document.location.href = "/profile.html";
  }

  console.log(token);

  menuContainer.innerHTML = `
   
    ${authLink}
`;

  logoutButton();
}

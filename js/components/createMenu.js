import { getToken } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const menuContainer = document.querySelector("ul.navbar-nav");

  const token = getToken();

  let authLink = ` <li class="nav-item"> <a href="/index.html" class="${
    pathname === "/" || pathname === "/index.html" ? "active" : ""
  }">Listings</a></li>

  <li class="nav-item"> <a href="/login.html" class="${
    pathname === "/login.html" || pathname === "/login.html" ? "active" : ""
  }">Login</a></li>

  <li class="nav-item"> <a href="/register.html" class="${
    pathname === "/register.html" || pathname === "/register.html"
      ? "active"
      : ""
  }">Register</a></li>
  
  `;

  if (token) {
    authLink = `<li class="nav-item"><a href="profile.html" class="${
      pathname === "/profile.html" ? "active" : ""
    }"><i class="fa-regular fa-user"></i> Profile</a></li>

    <li class="nav-item"> <a href="/index.html" class="${
      pathname === "/index.html" || pathname === "/index.html" ? "active" : ""
    }">Listings</a></li>

    <li class="nav-item">
        <button id="logout">Logout</button>
        </li>`;
  }

  /*if (pathname !== "/profile.html" && token) {
    document.location.href = "/profile.html";
  }*/

  menuContainer.innerHTML = `

${authLink}
`;

  logoutButton();
}

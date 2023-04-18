const tokenKey = "token";
const userKey = "user";
const avatarKey = "avatar";
const creditKey = "credits";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUsername() {
  return getFromStorage(userKey);
}

export function saveAvatar(avatar) {
  saveToStorage(avatarKey, avatar);
}

export function getAvatar() {
  return getFromStorage(avatarKey);
}

export function clearStorage() {
  localStorage.clear();
}

export function saveCredits(credits) {
  saveToStorage(creditKey, credits);
}

export function getCredits() {
  return getFromStorage(creditKey);
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

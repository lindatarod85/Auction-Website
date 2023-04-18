import { getToken } from "../utils/storage.js";

const myToken = getToken();

export const myAuth = "Bearer " + myToken;

export const options = {
  headers: {
    Authorization: myAuth,
  },
};

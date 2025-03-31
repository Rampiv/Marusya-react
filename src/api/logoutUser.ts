import { BASE_URL } from "./config"

export const logoutUser = async () => {
  const API_URL = `${BASE_URL}auth/logout`
  await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  })

  // deleteAllCookies()
}

// function deleteAllCookies() {
//   document.cookie.split(';').forEach(cookie => {
//       const eqPos = cookie.indexOf('=');
//       const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
//       document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
//   });
// }
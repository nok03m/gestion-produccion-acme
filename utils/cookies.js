export const saveCookie = (name, value, days) => {
  let exp = "";

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    exp = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + exp + "; path=/; SameSite=Lax";
};

export const getCookie = (name) => {
  const listCookies = document.cookie.split(';');

  const cookieFound = listCookies.find(cookie => {
    const cleanCookie = cookie.trim();
    return cleanCookie.startsWith(`${name}=`);
  });

  if (cookieFound) {
    return cookieFound.trim().split('=')[1];
  }

  return null;
};

export const deleteCookie = (name) => {
  // Force expiration
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
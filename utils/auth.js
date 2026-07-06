import { getCookie } from "./cookies.js";

const pagesWithoutSession = ["", "/", "/index.html"];
const isActiveSession = getCookie("session_cookie") !== null;
const pathname = document.location.pathname;
 
if (isActiveSession) {
    if (pagesWithoutSession.includes(pathname)) {
        alert("Active session!!! \n\nRedirecting...");
        window.location.href = "../pages/home.html";
    }
} else {
    if (!pagesWithoutSession.includes(pathname)) {
        alert("You need to log in \n\nRedirecting...");
        window.location.href = "../index.html";
    }
}
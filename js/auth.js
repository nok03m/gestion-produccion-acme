import { getCookie } from "./utils/cookies.js";

const pagesWithoutSession = ["", "/", "/index.html", "/pages/login.html"];
const isActiveSession = getCookie("session_cookie") !== null;
const pathname = window.location.pathname;
 
if (isActiveSession) {
    if (pagesWithoutSession.includes(pathname)) {
        alert("Redireccionando... \n\n(SESION ACTIVA)");
        window.location.href = "../pages/inventory.html";
    }
} else {
    if (!pagesWithoutSession.includes(pathname)) {
        alert("Redireccionando... \n\n(INICIAR SESION)");
        window.location.href = "login.html";
    }
}
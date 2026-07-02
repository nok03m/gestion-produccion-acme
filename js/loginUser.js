import { findUser } from "../service/userService.js";
import { saveCookie } from "./utils/cookies.js";

const formLoginEl = document.getElementById("login");

formLoginEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(formLoginEl);
    const user = await findUser(data.get("id"));

    if(user != null) {
        if(user.password === data.get("password")) {
            alert("Iniciando sesion!!!");
            saveCookie("session_cookie", user, 1);
            window.location.href = "../pages/inventory.html";
        } else {
            alert("Clave incorrecta!!!");
        }
    } else {
        alert("Usuario no encontrado!!!")
    }
});
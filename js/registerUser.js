import { addUser } from "../service/userService.js";

const formAddUserEl = document.getElementById("add-user");

formAddUserEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(formAddUserEl);

    addUser(data.get("id"), data.get("name"), data.get("username"), data.get("password"));
    alert("Usuario registrado...\nRedigiriendo...")
    window.location.href = "../pages/login.html";
});
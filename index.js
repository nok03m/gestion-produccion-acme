import { findUser } from "./services/userService.js";
import { saveCookie } from "./utils/cookies.js";

const formLoginEl = document.getElementById("login");

formLoginEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(formLoginEl);
    const user = await findUser(data.get("id"));

    if (user === null) {
        alert("User not found!!!");
        return
    }

    if (user.password !== data.get("password")) {
        alert("Incorrect password!!!");
        return
    }

    if (user.role !== data.get("role")) {
        alert("You do not have this role!!!");
        return
    }

    alert("Welcome to ACME!!!");
    user.password = "***";
    saveCookie("session_cookie", JSON.stringify(user), 1);
    window.location.href = "./pages/home.html";
});

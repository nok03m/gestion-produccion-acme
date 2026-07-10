import { deleteCookie } from "../utils/cookies.js";

class NavBar extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <nav>
            <ul>
                <li><a href="home.html">Home</a></li>
                <li><a href="users.html">Users</a></li>
                <li><a href="inventory.html">Inventory</a></li>
                <li><a href="production.html">Production</a></li>
                <button id="log-out">Log out</button>
            </ul>
        </nav>
        `
    }

    connectedCallback() {
        const logOutBtn = document.getElementById("log-out");

        logOutBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            deleteCookie("session_cookie");
            window.location.reload();
        })
    }
}

customElements.define("nav-bar", NavBar);
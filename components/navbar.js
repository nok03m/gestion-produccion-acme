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
            </ul>
        </nav>
        `
    }
}

customElements.define("nav-bar", NavBar);
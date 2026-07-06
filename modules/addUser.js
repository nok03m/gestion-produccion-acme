import { userExists, addUser } from "../services/userService.js";

const formAddUserEl = document.getElementById("add-user");

formAddUserEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(formAddUserEl);
    const id = data.get("id");
    const existId = await userExists(id);

    if (id === null || existId) {
        alert("Identification is not available")
    } else {
        const user = {
            "id": id,
            "name": data.get("name"),
            "password": data.get("password"),
            "role": "user"
        }

        await addUser(user);
        alert("User added!!!");
        
        window.location.href = "users.html";
    }
});
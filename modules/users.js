import { listUsers, deleteUser } from "../services/userService.js";

const listUsersEl = document.getElementById("list-users");

document.addEventListener("DOMContentLoaded", async () => {
    renderUsers();
});

async function renderUsers() {
    const response = await listUsers();
    const users = response !== null ? Object.values(response) : [];

    let outputHtml = "";

    users.forEach((user) => {
        outputHtml += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.password}</td>
                <td>${user.role}</td>
                <td>
                    <button class='delete' data-id='${user.id}' data-role='${user.role}'>Delete</button>
                </td>
            </tr>
        `
    });

    listUsersEl.innerHTML = outputHtml;
    configListUsers();
}

function configListUsers() {
    const btnsDelete = document.getElementsByClassName("delete");

    for (const el of btnsDelete) {
        const role = el.getAttribute("data-role");

        if (role === "admin") {
            el.remove();
            continue;
        }

        el.addEventListener("click", async () => {
            const id = el.getAttribute("data-id");

            await deleteUser(id);
            await renderUsers();
        })
    }
}
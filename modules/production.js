import { listHistory } from "../services/productionService.js";

const listHistoryEl = document.getElementById("list-history");

document.addEventListener("DOMContentLoaded", async () => {
    renderHistory();
});


async function renderHistory() {
    const response = await listHistory();
    const list = response !== null ? Object.values(response) : [];

    let outputHtml = "";
    let feedstockStr = "";

    list.forEach((history) => {
        const feedstockUsed = Object.values(history.feedstock).reduce((prev, curr) => prev + curr.quantityUsed, 0);
        const fsStr = history.feedstock.map((f) => " " + f.name).toString();
        outputHtml += `
            <tr>
                <td>${history.name}</td>
                <td>${feedstockUsed}</td>
                <td>${fsStr}</td>
            </tr>
        `
    });

    listHistoryEl.innerHTML = outputHtml;
}
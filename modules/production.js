import { listHistory } from "../services/productionService.js";

const listHistoryEl = document.getElementById("list-history");

document.addEventListener("DOMContentLoaded", async () => {
    renderHistory();
});


async function renderHistory() {
    const response = await listHistory();
    const list = response !== null ? Object.values(response) : [];

    listHistoryEl.innerHTML = "";

    if (list === null) {
        return;
    }

    const orderList = list.sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);

        return dateA < dateB ? 1 : -1;
    });

    let outputHtml = "";

    orderList.forEach((history) => {

        if (history !== null) {
            const feedstockUsed = Object.values(history.feedstock).reduce((prev, curr) => prev + curr.quantityUsed, 0);
            const fsStr = history.feedstock.map((f) => " " + f.name).toString();
            outputHtml += `
            <tr>
                <td>${history.date}</td>
                <td>COD0${history.code}</td>
                <td>${history.name}</td>
                <td>${feedstockUsed}</td>
                <td>${fsStr}</td>
                <td>${history.user}</td>
            </tr>
        `
        }
    });

    listHistoryEl.innerHTML = outputHtml;
}
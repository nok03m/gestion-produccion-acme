import { listProducts } from "../service/productService.js";
const productsEl = document.getElementById("products");

document.addEventListener("DOMContentLoaded", async () => {
    const res = await listProducts().then((res) => res.json());
    const products = Object.values(res);

    let buildTableData = "";

    products.forEach(product => {
        buildTableData += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>
                    <a href='#'>Editar</a> / <a href='#'>Eliminar</a>
                </td>
            </tr>
         `
    });
    productsEl.innerHTML = buildTableData;
})
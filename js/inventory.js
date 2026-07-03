import { deleteProduct, listProducts } from "../service/productService.js";

const productsEl = document.getElementById("products");

document.addEventListener("DOMContentLoaded", async () => {
  const res = await listProducts().then((res) => res.json());
  const products = res !== null? Object.values(res): [];

  let buildTableData = "";

  products.forEach((product) => {
    buildTableData += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>
                    <button class='editProd' data-id=${product.id}>Editar</button>
                    <button class='deleteProd' data-id=${product.id}>Eliminar</button>
                </td>
            </tr>
         `;
  });
  productsEl.innerHTML = buildTableData;

  const btnsEditProdEl = document.getElementsByClassName("editProd");
  const btnsDeleteProdEl = document.getElementsByClassName("deleteProd");

  for (const el of btnsEditProdEl) {
    el.addEventListener("click", (e) => {
      alert("Editar producto sin implementar...")
    });
  }

  for (const el of btnsDeleteProdEl) {
    el.addEventListener("click", async (e) => {
        const id = el.getAttribute("data-id");
        await deleteProduct(id);

        window.location.reload();
    });
  }
});

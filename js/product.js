import { addProduct } from "../service/productService.js";

const formAddProdEl = document.getElementById("add-product");

formAddProdEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(formAddProdEl);

    await addProduct(data.get("name"), data.get("quantity"), data.get("price"));
    alert("Producto creado...\nRedigiriendo...")
    window.location.href = "../pages/inventory.html";
});
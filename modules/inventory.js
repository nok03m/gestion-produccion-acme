import {
    addProduct, deleteProduct, listProducts,
    findLastProdByCode, findProduct,
    modifyProduct
} from "../services/productService.js";

const listProductsEl = document.getElementById("list-products");
const formAddProdEl = document.getElementById("add-product");
const typeProductEl = document.getElementsByName("type-product");
const editProductFormEl = document.getElementById('edit-product-form');

document.addEventListener("DOMContentLoaded", async () => {
    renderProducts();
});

async function renderProducts() {
    const response = await listProducts();

    listProductsEl.innerHTML = "<span>No products were found</span>";

    if (response === null) {
        return;
    }

    let outputHtml = "";

    Object.values(response).forEach((prod) => {
        if (prod !== null) {
            outputHtml += `
            <tr>
                <td>COD0${prod.code}</td>
                <td>${prod.name}</td>
                <td>${prod.supplier}</td>
                <td>${prod.type}</td>
                <td>${prod.stock}</td>
                <td>
                    <button class='view' data-code='${prod.code}' data-type='${prod.type}'>View</button>
                    <button class='edit' data-code='${prod.code}' data-type='${prod.type}'>Edit</button>
                    <button class='delete' data-code='${prod.code}'>Delete</button>
                </td>
            </tr>
        `
        }
    });

    listProductsEl.innerHTML = outputHtml;
    configListProducts();
}

formAddProdEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(formAddProdEl);
    const typeProduct = data.get("type-product");
    let productReady = false;

    if (typeProduct === null) {
        alert("You must select a product type");
        return;
    }

    const product = {
        name: data.get("name"),
        supplier: data.get("supplier"),
        type: data.get("type-product"),
        stock: data.get("stock"),
    };

    switch (typeProduct) {
        case "production":
            const listFeedstock = Array.from(document.querySelectorAll(".feedstock:checked"));

            if (listFeedstock.length === 0) {
                alert("If it is production, it must have at least one feedstock.");
                break;
            }

            let isFeedstockAvailable = [];

            for (const feedstock of listFeedstock) {
                const prodAvailable = await findProduct(feedstock.value);

                if (prodAvailable === null) {
                    isFeedstockAvailable.push(false);
                    continue;
                }

                const quantityEl = feedstock.parentElement.lastElementChild;
                const quantityFeedstock = Number(quantityEl.value);
                const totalRequired = Number(product.stock * quantityFeedstock);

                isFeedstockAvailable.push(prodAvailable.stock >= totalRequired);
            }

            productReady = isFeedstockAvailable.every((available) => available === true);

            if (productReady) {
                let dataFeedstock = [];

                for (const feedstock of listFeedstock) {
                    const prodAvailable = await findProduct(feedstock.value);

                    const quantityEl = feedstock.parentElement.lastElementChild;
                    const quantityFeedstock = Number(quantityEl.value);
                    const totalRequired = Number(product.stock * quantityFeedstock);

                    prodAvailable.stock = Number(prodAvailable.stock) - totalRequired;
                    await modifyProduct(prodAvailable);

                    dataFeedstock.push({
                        "code": totalRequired,
                        "name": prodAvailable.name,
                        "quantityUsed": totalRequired
                    });
                }

                product.feedstock = dataFeedstock;
                await addProduct(product);
            } else {
                alert("FAILED");
            }
            break;
        case "feedstock":
            await addProduct(product);
            productReady = true;
            break;
        default:
            alert("The product type selection is invalid");
    }

    if (productReady) {
        alert("Created!!!");
        document.getElementById("feedstock-box").innerHTML = "";
        formAddProdEl.reset();
        renderProducts();
    }
});


function configListProducts() {
    const btnsView = document.getElementsByClassName("view");
    const btnsEdit = document.getElementsByClassName("edit");
    const btnsDelete = document.getElementsByClassName("delete");

    for (const el of btnsDelete) {
        el.addEventListener("click", async () => {
            const code = el.getAttribute("data-code");
            await deleteProduct(code);
            await renderProducts();
        })
    }

    for (const el of btnsView) {
        el.addEventListener('click', async () => {
            const product = await findProduct(el.getAttribute("data-code"));
            seeProduct(product);
        });
    }

    for (const el of btnsEdit) {
        el.addEventListener('click', async () => {
            const product = await findProduct(el.getAttribute("data-code"));
            editProduct(product);
        });
    }
}


function configQuantityFeedstock() {
    const checksFeedstock = document.getElementsByClassName("feedstock");

    for (const el of checksFeedstock) {
        el.addEventListener("change", async () => {
            const quantityEl = el.parentElement.lastElementChild;
            quantityEl.toggleAttribute("disabled");
        });
    }
}

for (const el of typeProductEl) {
    el.addEventListener("change", async (e) => {
        const feedstockBoxEl = document.getElementById("feedstock-box");

        feedstockBoxEl.innerHTML = "";

        if (e.target.value === "production") {
            const products = await listProducts();

            let outputHtml = "<h2>Feedstock available</h2>";

            if (products !== null) {
                products.forEach((prod) => {
                    if (prod !== null) {
                        outputHtml += `
                        <div class='option'>
                            <label>
                                <input class="feedstock" type='checkbox' value='${prod.code}'>
                                <span>${prod.name} (${prod.stock}) </span>
                                <input type='number' class='quantity' name='quantity' \
                                max='${prod.stock}'
                                required disabled>
                            </label>
                        </div>
                    `;
                    }
                });
            } else {
                outputHtml += '<span>No feedstock were found</span>'
            }

            feedstockBoxEl.innerHTML = outputHtml;
            configQuantityFeedstock();
        }
    });
}

function seeProduct(product) {
    document.getElementById('view-code').textContent = product.code;
    document.getElementById('view-name').textContent = product.name;
    document.getElementById('view-supplier').textContent = product.supplier;
    document.getElementById('view-type').textContent = product.type;
    document.getElementById('view-stock').textContent = product.stock;

    document.getElementById('view-product-modal').style.display = 'flex';
}

function editProduct(product) {
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-supplier').value = product.supplier;
    document.getElementById('edit-stock').value = product.stock;
    document.getElementById("submit-edit").setAttribute("data-code", product.code);

    document.getElementById('edit-product-modal').style.display = 'flex';
}

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal-overlay').style.display = 'none';
    });
});

editProductFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitEditEl = document.getElementById("submit-edit");
    const product = await findProduct(submitEditEl.getAttribute("data-code"));
    const data = new FormData(editProductFormEl);

    product.name = data.get("name");
    product.supplier = data.get("supplier");

    await modifyProduct(product);
    await renderProducts();
    document.getElementById('edit-product-modal').style.display = 'none';
});

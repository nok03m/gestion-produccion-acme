import { httpClientWithBody, httpClientWithoutBody, httpClientGet } from "../utils/httpClient.js";

const URL_BASE = "https://gestion-produccion-56714-default-rtdb.firebaseio.com/product";

export const addProduct = async (product) => {
    const lastCode = await findLastProdByCode();

    const newCode = lastCode !== undefined ? lastCode + 1 : 0;
    const URL = `${URL_BASE}/${newCode}.json`;

    await httpClientWithBody(URL, { code: newCode, ...product }, "PUT");
    return newCode
}

export const modifyProduct = async (product) => {
    const URL = `${URL_BASE}/${product.code}.json`;
    await httpClientWithBody(URL, product, "PATCH");
}

export const findProduct = async (code) => {
    const URL = `${URL_BASE}/${code}.json`;

    return await httpClientGet(URL).then((res) => res.json());
}

export const deleteProduct = async (code) => {
    const URL = `${URL_BASE}/${code}.json`;

    return await httpClientWithoutBody(URL, "DELETE");
}

export const productExists = async (code) => {
    return await findProduct(code) !== null;
}

export const listProducts = async () => {
    const URL = `${URL_BASE}.json`;
    const response = await httpClientGet(URL).then((res) => res.json());
    return response;
}

export const findLastProdByCode = async () => {
    const response = await listProducts();

    if (response === null) {
        return;
    }

    const lastProd = Object.values(response).at(-1);

    return lastProd.code;

    // Example with 'arrayObject'.reduce()

    // const response = await listProducts();

    // if (response === null) {
    //     return;
    // }

    // const lastProduct = Object.values(response).reduce((prev, curr) => curr.code > prev.code ? curr: prev)
    // return lastProduct.code;
}
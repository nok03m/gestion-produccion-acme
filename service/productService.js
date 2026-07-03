
import { getCookie } from "../js/utils/cookies.js";
import { httpClientGet, httpClientWithBody, httpClientWithoutBody } from "../js/utils/http-client.js";

const URL_BASE = "https://gestion-produccion-56714-default-rtdb.firebaseio.com";

export const getLengthProducts = async () => {
    const URL = `${URL_BASE}/product.json`;
    const res = await httpClientGet(URL).then((res) => res.json());

    if (res === null) return 0;
    return Object.keys(res).length;
}

export const addProduct = async (name, quantity, price) => {
    const lengthProducts = await getLengthProducts();
    const newId = `COD0${lengthProducts + 1}`;

    const URL = `${URL_BASE}/product/${newId}.json`;

    await httpClientWithBody(URL, {id: newId, name, quantity, price }, "PUT");
}

export const listProducts = async () => {
    const URL = `${URL_BASE}/product.json`;

    return await httpClientGet(URL);
}

export const deleteProduct = async (id) => {
    const URL = `${URL_BASE}/product/${id}.json`;

    return await httpClientWithoutBody(URL, "DELETE");
}
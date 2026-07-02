import { httpClientWithBody, httpClientGet } from "../js/utils/http-client.js";

const URL_BASE = "https://gestion-produccion-56714-default-rtdb.firebaseio.com/user/";

export const addUser = async (id, name, username, password) => {
    const URL = `${URL_BASE}${id}.json`;

    await httpClientWithBody(URL, {id, name, username, password }, "PUT");
}

export const findUser = async (id) => {
    const URL = `${URL_BASE}${id}.json`;

    return await httpClientGet(URL).then((res) => res.json());
}
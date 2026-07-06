import { httpClientWithBody, httpClientWithoutBody, httpClientGet } from "../utils/httpClient.js";

const URL_BASE = "https://gestion-produccion-56714-default-rtdb.firebaseio.com/user";

export const addUser = async (user) => {
    const URL = `${URL_BASE}/${user.id}.json`;

    await httpClientWithBody(URL, user, "PUT");
}

export const findUser = async (id) => {
    const URL = `${URL_BASE}/${id}.json`;

    return await httpClientGet(URL).then((res) => res.json());
}

export const listUsers = async () => {
    const URL = `${URL_BASE}.json`;

    return await httpClientGet(URL).then((res) => res.json());
}

export const deleteUser = async (id) => {
    const URL = `${URL_BASE}/${id}.json`;

    return await httpClientWithoutBody(URL, "DELETE");
}

export const userExists = async (id) => {
    return await findUser(id) !== null;
}
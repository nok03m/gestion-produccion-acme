import { httpClientWithBody, httpClientWithoutBody, httpClientGet } from "../utils/httpClient.js";

const URL_BASE = "https://gestion-produccion-56714-default-rtdb.firebaseio.com/history";

export const addHistory = async (history) => {
    const URL = `${URL_BASE}.json`;

    await httpClientWithBody(URL, history, "POST");
}

export const listHistory = async () => {
    const URL = `${URL_BASE}.json`;

    return await httpClientGet(URL).then((res) => res.json());
}
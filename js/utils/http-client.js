export const httpClientWithBody = (url, payload, method) => {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
}

export const httpClientGet = (url) => {
    return fetch(url);
}
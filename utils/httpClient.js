export const httpClientWithBody = (url, payload, method) => {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
}

export const httpClientWithoutBody = (url, method) => {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const httpClientGet = (url) => {
    return fetch(url);
}
export const getWithToken = async (url, token) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export const postWithToken = async (url, token, payload) => {
    console.log(JSON.stringify(payload));
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    console.log(response);
    const data = await response.json();
    return data;
}
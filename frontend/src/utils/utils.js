export const getWithToken = async (url, token) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status !== 200) {
        return;
    }

    const data = await response.json();
    return data;
}

export const postWithToken = async (url, token, payload) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: payload
    });
    
    if (response.status !== 200) {
        return;
    }

    const data = await response.json();
    return data;
}
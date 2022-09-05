export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbc-cohort-1',
    headers: {
        authorization: '322e73f5-b48c-4094-a909-95dc3b0fb90c',
        'Content-Type': 'application/json'
    }
};

export function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json()
        .then(function (err) {
            err.code = res.status;
            return Promise.reject(`Ошибка: ${res.status}`)
        });
};

export function handleError(err) {
    console.log(err);
};

export function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
        .then(handleResponse)
};

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
        .then(handleResponse)
};

export function editAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar })
    })
        .then(handleResponse)
};

export function editProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    })
        .then(handleResponse)
};

export function addPlace(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    })
        .then(handleResponse)
};

export function deletePlace(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse)
};

export function likeCard(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(handleResponse)
};

export function dislikeCard(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse)
};



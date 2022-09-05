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
  
  function loadigPopup(isLoading, popup) {
    const buttonSave = popup.querySelector('.popup__save-button');
    if (isLoading) {
      buttonSave.textContent = 'Сохранение...'
    } else {
      buttonSave.textContent = 'Сохранить'
    }
  };
  
  export function editAvatar() {
    loadigPopup(true, popupAvatar)
    fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarInput.value,
      })
    })
      .then(handleResponse)
      .then(function (result) {
        profileAvatar.src = result.avatar;
      })
      .catch(handleError)
      .finally(function () {
        loadigPopup(false, popupAvatar)
      })
  
  };
  
  export function editProfile() {
    loadigPopup(true, popupEdit)
    fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: professionInput.value
      })
    })
      .then(handleResponse)
      .then(getProfileInfo)
      .catch(handleError)
      .finally(function () {
        loadigPopup(false, popupEdit)
      })
  };
  
  export function addPlace() {
    loadigPopup(true, popupAdd)
    fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: placeTitleInput.value,
        link: placeLinkInput.value
      })
    })
      .then(handleResponse)
      .then(function (res) {
        places.prepend(createPlace(res))
      })
      .catch(handleError)
      .finally(function () {
        loadigPopup(false, popupAdd)
      })
  
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
      body: JSON.stringify({
        userId: userId
      })
    })
      .then(handleResponse)
  };
  
  export function dislikeCard(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers,
      body: JSON.stringify({
        userId: userId
      })
    })
      .then(handleResponse)
  };
  


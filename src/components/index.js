//инициализацию JS-кода, добавление слушателей и другие важные участки оставьте в файле
import '../pages/index.css';

import { mestoSelectors } from './data.js';
import { popupPlace, createPlace } from './card.js';
import { closePopup, openPopup } from './utils.js';
import { revalidateForm, enableValidation } from './validate.js';
import {
  nameInput, professionInput,
  profileName, profileProfession,
  places, placeTitleInput, placeLinkInput,
  avatarInput, submitFormAvatar,
  popupEdit, popupAdd,
  submitFormProfile, submitFormPlace,
  closePopupOnOverlayClick,
  popupAvatar
} from './modal.js';

export let userId;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__avatar-edit-button');
const formProfile = document.querySelector('#profile');
const formPlace = document.querySelector('#place');
const formAvatar = document.querySelector('#avatar');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close-button');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close-button');
const buttonClosePopupPlace = popupPlace.querySelector('.popup__close-button');
const buttonClosePopupAvatar = popupAvatar.querySelector('.popup__close-button');
const profileAvatar = document.querySelector('.profile__avatar');

//initialCards.forEach(function (card) {
//  places.prepend(createPlace(card.name, card.link))
//});

buttonClosePopupEdit.addEventListener('click', function () {
  closePopup(popupEdit);
});
buttonClosePopupAdd.addEventListener('click', function () {
  closePopup(popupAdd)
});
buttonClosePopupPlace.addEventListener('click', function () {
  closePopup(popupPlace)
});
buttonClosePopupAvatar.addEventListener('click', function () {
  closePopup(popupAvatar)
});


formProfile.addEventListener('submit', submitFormProfile);
formPlace.addEventListener('submit', submitFormPlace);
formAvatar.addEventListener('submit', submitFormAvatar);

popupEdit.addEventListener('click', closePopupOnOverlayClick);
popupAdd.addEventListener('click', closePopupOnOverlayClick);
popupPlace.addEventListener('click', closePopupOnOverlayClick);
popupAvatar.addEventListener('click', closePopupOnOverlayClick);


editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  revalidateForm(formProfile, mestoSelectors);
  openPopup(popupEdit);
});

addButton.addEventListener('click', function () {
  placeTitleInput.value = '';
  placeLinkInput.value = '';
  revalidateForm(formPlace, mestoSelectors);
  openPopup(popupAdd);
});

buttonEditProfile.addEventListener('click', function () {
  avatarInput.value = '';
  revalidateForm(formAvatar, mestoSelectors);
  openPopup(popupAvatar);
});

enableValidation(mestoSelectors);

//////////////

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbc-cohort-1',
  headers: {
    authorization: '322e73f5-b48c-4094-a909-95dc3b0fb90c',
    'Content-Type': 'application/json'
  }
}
export function getProfileInfo() {
  fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      };
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    // обрабатываем результат
    .then(function (result) {
      profileName.textContent = result.name;
      profileProfession.textContent = result.about;
      profileAvatar.src = result.avatar;
      userId = result._id;
      console.log(result)
    })
    // выводим ошибку в консоль    
    .catch(function (err) {
      console.log(err);
    })
};

getProfileInfo();

export function getInitialCards() {
  fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      };
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .then (function (result) {
    //   const cards = Array.from(result);
    //   places.append(cards.some(createPlace(result)))
    // })
    .then(function (result) {
      for (let i = 0; i < result.length; i++) {
        places.append(createPlace(result[i]))
      }
      console.log(result)
    })
    .catch(function (err) {
      console.log(err);
    })
};

getInitialCards();

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
    .then(function (res) {
      if (res.ok) {
        return res.json();
      };
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(function (result) {
      profileAvatar.src = result.avatar;
    })
    .catch(function (err) {
      console.log(err);
    })
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
    .then(function (res) {
      if (res.ok) {
        return res.json();
      };
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(getProfileInfo)
    .catch(function (err) {
      console.log(err);
    })
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
    .then(function (res) {
      if (res.ok) {
        return res.json();
      };
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(function (res) {
      places.prepend(createPlace(res))
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(function () {
      loadigPopup(false, popupAdd)
    })

};

export function deletePlace(card) {
  return fetch(`${config.baseUrl}/cards/${card.id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      };
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

export function handleDeletePlace(card) {
  return deletePlace(card.id)
    .then(function () {
      //evt.target.closest('.place').remove();
      card.remove();
    })
    .catch(function (err) {
      console.log(err);
    })
};

//evt.target.closest('.place').remove();
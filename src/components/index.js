//инициализацию JS-кода, добавление слушателей и другие важные участки оставьте в файле

import '../pages/index.css';

import { initialCards } from './data.js';
import { createPlace } from './card.js';
import { closePopup, openPopup } from './utils.js';
import { revalidateForm, enableValidation } from './validate.js';
import {
    nameInput, professionInput,
    profileName, profileProfession, 
    places, placeTitleInput, placeLinkInput,
    popupEdit, popupAdd,
    submitFormProfile, submitFormPlace
} from './modal.js';

const mestoSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-item_error',
    errorClass: 'popup__input-error-message_active'
};
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupPlace = document.querySelector('.popup-place');

const formProfile = document.querySelector('#profile');
const formPlace = document.querySelector('#place');

const closeButtonPopupEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonPopupAdd = popupAdd.querySelector('.popup__close-button');
const closeButtonPopupPlace = popupPlace.querySelector('.popup__close-button');

initialCards.forEach(function (card) {
    places.prepend(createPlace(card.name, card.link))
});


closeButtonPopupEdit.addEventListener('click', function () {
    closePopup(popupEdit);
});
closeButtonPopupAdd.addEventListener('click', function () {
    closePopup(popupAdd)
});
closeButtonPopupPlace.addEventListener('click', function () {
    closePopup(popupPlace)
});

formProfile.addEventListener('submit', submitFormProfile);

formPlace.addEventListener('submit', submitFormPlace);

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

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
});

enableValidation(mestoSelectors);
//работа модальных окон
//import { profileName, profileProfession, nameInput, professionInput } from ".index.js";
import { closePopup } from "./utils.js";
import { addPlace, editProfile, editAvatar, handleError } from "./api.js";
import { createPlace } from "./card.js";

export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
export const profileAvatar = document.querySelector('.profile__avatar');
export const nameInput = document.querySelector('.popup__input-item_profile_name');
export const professionInput = document.querySelector('.popup__input-item_profile_profission');
export const places = document.querySelector('.places');
export const placeTitleInput = document.querySelector('.popup__input-item_place_title');
export const placeLinkInput = document.querySelector('.popup__input-item_place_link');
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const avatar = document.querySelector('.profile__avatar');
export const avatarInput = document.querySelector('.popup__input-item_avatar');
export const popupAvatar = document.querySelector('.popup-avatar');

function loadigPopup(isLoading, popup) {
    const buttonSave = popup.querySelector('.popup__save-button');
    if (isLoading) {
        buttonSave.textContent = 'Сохранение...'
        buttonSave.disabled = true;
    } else {
        buttonSave.textContent = 'Сохранить'
        buttonSave.disabled = false;
    }
};

export function submitFormProfile(evt) {
    evt.preventDefault();
    // profileName.textContent = nameInput.value;
    // profileProfession.textContent = professionInput.value;
    loadigPopup(true, popupEdit)
    editProfile(nameInput.value, professionInput.value)
        .then(function (result) {
            profileName.textContent = result.name;
            profileProfession.textContent = result.about;
        })
        .catch(handleError)
        .then(closePopup(popupEdit))
        .finally(function () {
            loadigPopup(false, popupEdit)
        })
};


export function submitFormPlace(evt) {
    evt.preventDefault();
    //places.prepend(createInitialPlace(placeTitleInput.value, placeLinkInput.value));
    loadigPopup(true, popupAdd)
    addPlace(placeTitleInput.value, placeLinkInput.value)
        .then(function (result) {
            places.prepend(createPlace(result))
        })
        .catch(handleError)
        .then(closePopup(popupAdd))
        .finally(function () {
            loadigPopup(false, popupAdd)
        })
};

// name: placeTitleInput.value,
// link: placeLinkInput.value

export function submitFormAvatar(evt) {
    evt.preventDefault();
    //avatarInput.value = avatar.src;
    loadigPopup(true, popupAvatar)
    editAvatar(avatarInput.value)
        .then(function (result) {
            profileAvatar.src = result.avatar;
        })
        .catch(handleError)
        .then(closePopup(popupAvatar))
        .finally(function () {
            loadigPopup(false, popupAvatar)
        })
};


export function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
};

export function closePopupOnOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
};
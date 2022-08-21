//работа модальных окон
//import { profileName, profileProfession, nameInput, professionInput } from ".index.js";
import { closePopup } from "./utils.js";
import { createPlace } from "./card.js";

export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
export const nameInput = document.querySelector('.popup__input-item_profile_name');
export const professionInput = document.querySelector('.popup__input-item_profile_profission');
export const places = document.querySelector('.places');
export const placeTitleInput = document.querySelector('.popup__input-item_place_title');
export const placeLinkInput = document.querySelector('.popup__input-item_place_link');
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');

export function submitFormProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    closePopup(popupEdit);
};

export function submitFormPlace(evt) {
    evt.preventDefault();
    places.insertAdjacentElement('afterbegin', createPlace(placeTitleInput.value, placeLinkInput.value));
    closePopup(popupAdd);
};

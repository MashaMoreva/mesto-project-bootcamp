//работа модальных окон
//import { profileName, profileProfession, nameInput, professionInput } from ".index.js";
import { closePopup } from "./utils.js";
import { addPlace, editProfile, editAvatar } from "./index.js";

export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
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

export function submitFormProfile(evt) {
    evt.preventDefault();
    editProfile()
    //profileName.textContent = nameInput.value;
    //profileProfession.textContent = professionInput.value;
    closePopup(popupEdit);
};

export function submitFormPlace(evt) {
    evt.preventDefault();
    addPlace();
    //places.prepend(createInitialPlace(placeTitleInput.value, placeLinkInput.value));
    closePopup(popupAdd);
};

export function submitFormAvatar(evt) {
    evt.preventDefault();
    editAvatar();
    //avatarInput.value = avatar.src;
    closePopup(popupAvatar);
}

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
//инициализацию JS-кода, добавление слушателей и другие важные участки оставьте в файле
import './pages/index.css';

import { getProfileInfo, getInitialCards, handleError } from './components/api.js';
import { mestoSelectors } from './components/data.js';
import { createPlace, handleDeletePlace } from './components/card.js';
import { closePopup, openPopup } from './components/utils.js';
import { revalidateForm, enableValidation } from './components/validate.js';
import {
  nameInput, professionInput,
  profileName, profileProfession, profileAvatar,
  places, placeTitleInput, placeLinkInput,
  avatarInput, submitFormAvatar,
  popupEdit, popupAdd,
  submitFormProfile, submitFormPlace,
  popupAvatar
} from './components/modal.js';

export let userId;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__avatar-edit-button');
const formProfile = document.querySelector('#profile');
const formPlace = document.querySelector('#place');
const formAvatar = document.querySelector('#avatar');
const formDelete = document.querySelector('#delete');
const popups = document.querySelectorAll('.popup')

popups.forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

Promise.all([getProfileInfo(), getInitialCards()])
  // деструктурирую ответ от сервера, чтобы было понятнее, что пришло
  .then(function ([profileInfo, cards]) {
    profileName.textContent = profileInfo.name;
    profileProfession.textContent = profileInfo.about;
    profileAvatar.src = profileInfo.avatar;
    userId = profileInfo._id;
    cards.forEach(function (card) {
      places.append(createPlace(card))
    })
    console.log(profileInfo)
    console.log(cards)
  })
  .catch(handleError);

formProfile.addEventListener('submit', submitFormProfile);
formPlace.addEventListener('submit', submitFormPlace);
formAvatar.addEventListener('submit', submitFormAvatar);
formDelete.addEventListener('submit', handleDeletePlace);

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
//инициализацию JS-кода, добавление слушателей и другие важные участки оставьте в файле
import './pages/index.css';

import { getProfileInfo, getInitialCards, handleError } from './components/api.js';
import { mestoSelectors } from './components/data.js';
import { popupPlace, createPlace } from './components/card.js';
import { closePopup, openPopup } from './components/utils.js';
import { revalidateForm, enableValidation } from './components/validate.js';
import {
  nameInput, professionInput,
  profileName, profileProfession, profileAvatar,
  places, placeTitleInput, placeLinkInput,
  avatarInput, submitFormAvatar,
  popupEdit, popupAdd,
  submitFormProfile, submitFormPlace,
  closePopupOnOverlayClick,
  popupAvatar
} from './components/modal.js';

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

getProfileInfo()
  .then(function (result) {
    profileName.textContent = result.name;
    profileProfession.textContent = result.about;
    profileAvatar.src = result.avatar;
    userId = result._id;
    console.log(result)
  })
  .catch(handleError);

getInitialCards()
  .then(function (result) {
    result.forEach(function (card) {
      places.append(createPlace(card))
    })
    console.log(result)
  })
  .catch(handleError);


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
import './pages/index.css';

const initialCards = [
    {
        name: 'гора Эльбрус',
        link: 'https://35photo.pro/photos_main/1384/6922448.jpg'
    },
    {
        name: 'Карелия',
        link: 'https://35photo.pro/photos_main/1374/6870677.jpg'
    },
    {
        name: 'Халактырский пляж, Камчатка',
        link: 'https://35photo.pro/photos_main/1177/5889154.jpg'
    },
    {
        name: 'Сулакский каньон, Дагестан',
        link: 'https://35photo.pro/photos_main/1077/5387675.jpg'
    },
    {
        name: 'Алтай',
        link: 'https://35photo.pro/photos_main/1428/7141637.jpg'
    },
    {
        name: 'Домбай',
        link: 'https://35photo.pro/photos_main/768/3842757.jpg'
    }
];

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
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPlace = document.querySelector('.popup-place');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formProfile = document.querySelector('#profile');
const formPlace = document.querySelector('#place');
const nameInput = document.querySelector('.popup__input-item_profile_name');
const professionInput = document.querySelector('.popup__input-item_profile_profission');
const placeTitleInput = document.querySelector('.popup__input-item_place_title');
const placeLinkInput = document.querySelector('.popup__input-item_place_link');
const places = document.querySelector('.places');
const closeButtonPopupEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonPopupAdd = popupAdd.querySelector('.popup__close-button');
const closeButtonPopupPlace = popupPlace.querySelector('.popup__close-button');

function createPlace(name, link) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeElement.querySelector('.place__image');
    placeImage.src = link;
    placeImage.alt = name;
    placeElement.querySelector('.place__title').textContent = name;
    placeElement.querySelector('.place__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('place__like-button_active');
    });
    placeElement.querySelector('.place__delete-button').addEventListener('click', function (evt) {
        (evt.target.closest('.place')).remove();
    });
    placeImage.addEventListener('click', function () {
        popupPlace.querySelector('img').src = link;
        popupPlace.querySelector('.popup__place-title').textContent = name;
        openPopup(popupPlace);
    });

    return placeElement;

};

initialCards.forEach(function (card) {
    places.prepend(createPlace(card.name, card.link))
});

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function closePopupOnOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
};

function openPopup(popup) {
    popup.addEventListener('click', closePopupOnOverlayClick);
    popup.classList.add('popup_opened');
};

function submitFormProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    closePopup(popupEdit);
};

function submitFormPlace(evt) {
    evt.preventDefault();
    places.insertAdjacentElement('afterbegin', createPlace(placeTitleInput.value, placeLinkInput.value));
    closePopup(popupAdd);
};

function showError(inputElement, selectors, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.classList.add(selectors.errorClass);
    errorElement.textContent = errorMessage;
};

function hideError(inputElement, selectors) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(inputElement, selectors) {
    if (!inputElement.validity.valid) {
        showError(inputElement, selectors, inputElement.validationMessage);
    } else {
        hideError(inputElement, selectors);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
    });
};

function revalidateForm(formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    inputList.forEach(function (inputElement) {
        hideError(inputElement, selectors);
    });
    inactiveSubmitButton(buttonElement, selectors);
};

function inactiveSubmitButton(buttonElement, { inactiveButtonClass }) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
};

function activeSubmitButton(buttonElement, { inactiveButtonClass }) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
};

function toggleButtonState(inputList, buttonElement, selectors) {
    if (hasInvalidInput(inputList)) {
        inactiveSubmitButton(buttonElement, selectors);
    } else {
        activeSubmitButton(buttonElement, selectors);
    };
};

function setEventListeners(formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectors);
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement, selectors);
            toggleButtonState(inputList, buttonElement, selectors);
        });
    });
};

function enableValidation(selectors) {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach(function (formElement) {
        setEventListeners(formElement, selectors);
    });
};

closeButtonPopupEdit.addEventListener('click', function () {
    closePopup(popupEdit);
});
closeButtonPopupAdd.addEventListener('click', function () {
    closePopup(popupAdd)
});
closeButtonPopupPlace.addEventListener('click', function () {
    closePopup(popupPlace)
});

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

formProfile.addEventListener('submit', submitFormProfile);

formPlace.addEventListener('submit', submitFormPlace);

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
});

enableValidation(mestoSelectors);
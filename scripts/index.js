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
    placeImage.addEventListener('click', function (evt) {
        popupPlace.querySelector('img').src = evt.target.src;
        popupPlace.querySelector('.popup__place-title').textContent = evt.target.alt;
        openPopup(popupPlace);
    });

    return placeElement;

};

initialCards.forEach(function (card) {
    places.insertAdjacentElement('beforeend', createPlace(card.name, card.link))
});

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function openPopup(popup) {
    const closeButton = popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', function () {
        closePopup(popup);
    });
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;
    placeTitleInput.value = '';
    placeLinkInput.value = '';
    popup.classList.add('popup_opened');
};

function formProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    closePopup(popupEdit);
};

function formPlaceSubmit(evt) {
    evt.preventDefault();
    places.insertAdjacentElement('afterbegin', createPlace(placeTitleInput.value, placeLinkInput.value));
    closePopup(popupAdd);
}

editButton.addEventListener('click', function () {
    openPopup(popupEdit);
});

addButton.addEventListener('click', function () {
    openPopup(popupAdd);
});

formProfile.addEventListener('submit', formProfileSubmit);

formPlace.addEventListener('submit', formPlaceSubmit);
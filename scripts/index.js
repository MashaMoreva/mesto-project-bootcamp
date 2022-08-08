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

function addPlace(name, link) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    placeElement.querySelector('.place__image').src = link;
    placeElement.querySelector('.place__image').alt = name;
    placeElement.querySelector('.place__title').textContent = name;
    placeElement.querySelector('.place__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('place__like-button_active');
    });
    placeElement.querySelector('.place__delete-button').addEventListener('click', function (evt) {
        (evt.target.closest('.place')).remove();
    });
    placeElement.querySelector('.place__image').addEventListener('click', function (evt) {
        popupPlace.querySelector('img').src = evt.target.src;
        popupPlace.querySelector('.popup__place-title').textContent = evt.target.alt;
        openPopup(popupPlace);
    });

    return placeElement;

};

initialCards.forEach(function (card) {
    places.insertAdjacentElement('beforeend', addPlace(card.name, card.link))
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
    places.insertAdjacentElement('afterbegin', addPlace(placeTitleInput.value, placeLinkInput.value));
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
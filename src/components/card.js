//функции для работы с карточками проекта Mesto
import { openPopup, closePopup } from "./utils.js";
import { likeCard, dislikeCard, deletePlace, handleError } from "./api.js";
import { userId } from "../index.js";

const placeTemplate = document.querySelector('#place-template').content;
const popupPlace = document.querySelector('.popup-place');
const popupImage = popupPlace.querySelector('img');
const popupTitle = popupPlace.querySelector('.popup__place-title');
const popupDelete = document.querySelector('.popup-delete');
let deletedPlace = null;

export function createPlace(place) {
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeElement.querySelector('.place__image');
    const buttonDelete = placeElement.querySelector('.place__delete-button');
    const buttonLike = placeElement.querySelector('.place__like-button');
    const likeCounter = placeElement.querySelector('.place__like-counter');
    placeImage.src = place.link;
    placeImage.alt = place.name;
    placeElement.id = place._id;
    likeCounter.textContent = place.likes.length;
    placeElement.querySelector('.place__title').textContent = place.name;
    const likes = Array.from(place.likes);

    likes.forEach(function (element) {
        if (element._id === userId) {
            buttonLike.classList.add('place__like-button_active');
        }
    })

    buttonLike.addEventListener('click', function () {
        if (buttonLike.classList.contains('place__like-button_active')) {
            handleDislikeCard(placeElement, buttonLike, likeCounter)
        } else {
            handleLikeCard(placeElement, buttonLike, likeCounter)
        }
    })

    if (place.owner._id !== userId) {
        buttonDelete.remove();
    } else {
        buttonDelete.addEventListener('click', function (evt) {
            deletedPlace = evt.target.closest('.place');
            openPopup(popupDelete);
            //handleDeletePlace(placeElement)
        })
    }

    placeImage.addEventListener('click', function () {
        popupImage.src = place.link;
        popupImage.alt = place.name;
        popupTitle.textContent = place.name;
        openPopup(popupPlace);
    });

    return placeElement;

};

function loadigPopupDelete(isLoading, popup) {
    const buttonSave = popup.querySelector('.popup__save-button');
    if (isLoading) {
        buttonSave.textContent = 'Удаление...'
        buttonSave.disabled = true;
    } else {
        buttonSave.textContent = 'Да'
        buttonSave.disabled = false;
    }
};

export function handleDeletePlace(evt) {
    evt.preventDefault();
    loadigPopupDelete(true, popupDelete)
    return deletePlace(deletedPlace.id)
        .then(function () {
            deletedPlace.remove();
            closePopup(popupDelete);
            deletedPlace = null;
        })
        .catch(handleError)
        .finally(function () {
            loadigPopupDelete(false, popupDelete)
        })
};

function handleLikeCard(placeElement, buttonLike, likeCounter) {
    return likeCard(placeElement.id)
        .then(function (result) {
            buttonLike.classList.add('place__like-button_active');
            likeCounter.textContent = result.likes.length;
        })
        .catch(handleError);
};

function handleDislikeCard(placeElement, buttonLike, likeCounter) {
    return dislikeCard(placeElement.id)
        .then(function (result) {
            buttonLike.classList.remove('place__like-button_active');
            likeCounter.textContent = result.likes.length;
        })
        .catch(handleError);
};
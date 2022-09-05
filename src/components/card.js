//функции для работы с карточками проекта Mesto
import { openPopup } from "./utils.js";
import { likeCard, dislikeCard, deletePlace, handleError } from "./api.js";
import { userId } from "../index.js";

export const popupPlace = document.querySelector('.popup-place');

export function createPlace(place) {
    const placeTemplate = document.querySelector('#place-template').content;
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

    for (let i = 0; i < place.likes.length; i++) {
        if (place.likes[i]._id === userId) {
            buttonLike.classList.add('place__like-button_active');
        }
    }
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
        buttonDelete.addEventListener('click', function () {
            handleDeletePlace(placeElement)
        })
    }

    placeImage.addEventListener('click', function () {
        popupPlace.querySelector('img').src = place.link;
        popupPlace.querySelector('.popup__place-title').textContent = place.name;
        openPopup(popupPlace);
    });

    return placeElement;

};

function handleDeletePlace(placeElement) {
    return deletePlace(placeElement.id)
        .then(function () {
            placeElement.remove();
        })
        .catch(handleError);
};

function handleLikeCard(placeElement, buttonLike, likeCounter) {
    return likeCard(placeElement.id)
        .then(function () {
            buttonLike.classList.add('place__like-button_active');
            likeCounter.textContent = Number(likeCounter.textContent) + 1;
        })
        .catch(handleError);
};

function handleDislikeCard(placeElement, buttonLike, likeCounter) {
    return dislikeCard(placeElement.id)
        .then(function () {
            buttonLike.classList.remove('place__like-button_active');
            likeCounter.textContent = Number(likeCounter.textContent) - 1;
        })
        .catch(handleError);
};
//функции для работы с карточками проекта Mesto
import { openPopup } from "./utils.js";
import { userId, handleDeletePlace } from "./index.js";

export const popupPlace = document.querySelector('.popup-place');

export function createPlace(card) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeElement.querySelector('.place__image');
    const buttonDelete = placeElement.querySelector('.place__delete-button');
    const buttonLike = placeElement.querySelector('.place__like-button');
    placeImage.src = card.link;
    placeImage.alt = card.name;
    placeElement.id = card._id;
    placeElement.querySelector('.place__title').textContent = card.name;
    placeElement.querySelector('.place__like-counter').textContent = card.likes.length;
    // buttonLike.addEventListener('click', function (evt) {
    //     evt.target.classList.toggle('place__like-button_active');
    //});
    for (let i = 0; i < card.likes.length; i++);
    if (card.owner._id !== userId) {
        buttonDelete.remove();
    } else {
        buttonDelete.addEventListener('click', function () {
            handleDeletePlace(card.id)
        })
    }
    placeImage.addEventListener('click', function () {
        popupPlace.querySelector('img').src = card.link;
        popupPlace.querySelector('.popup__place-title').textContent = card.name;
        openPopup(popupPlace);
    });

    return placeElement;

};
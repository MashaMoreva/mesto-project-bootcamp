//функции для работы с карточками проекта Mesto

export function createPlace(name, link) {
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
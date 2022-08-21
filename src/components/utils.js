//утилитарные функции, которые используются в работе сразу нескольких других функций
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

export function openPopup(popup) {
    popup.addEventListener('click', closePopupOnOverlayClick);
    popup.classList.add('popup_opened');
};

export function closePopupOnOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
};
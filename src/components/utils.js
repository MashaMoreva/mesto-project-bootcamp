//утилитарные функции, которые используются в работе сразу нескольких других функций
import { closePopupOnEsc } from "./modal.js";

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
};

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEsc);
};
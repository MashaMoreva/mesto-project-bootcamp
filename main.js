(()=>{"use strict";var e={formSelector:".popup__form",inputSelector:".popup__input-item",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__input-item_error",errorClass:"popup__input-error-message_active"},t=document.querySelector(".profile__name"),o=document.querySelector(".profile__profession"),n=document.querySelector(".popup__input-item_profile_name"),r=document.querySelector(".popup__input-item_profile_profission"),c=document.querySelector(".places"),u=document.querySelector(".popup__input-item_place_title"),i=document.querySelector(".popup__input-item_place_link"),p=document.querySelector(".popup-edit"),l=document.querySelector(".popup-add");function a(e){"Escape"===e.key&&d(document.querySelector(".popup_opened"))}function s(e){e.target===e.currentTarget&&d(document.querySelector(".popup_opened"))}function d(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",a)}function m(e){e.classList.add("popup_opened"),document.addEventListener("keydown",a)}var _=document.querySelector(".popup-place");function v(e,t){var o=document.querySelector("#place-template").content.querySelector(".place").cloneNode(!0),n=o.querySelector(".place__image");return n.src=t,n.alt=e,o.querySelector(".place__title").textContent=e,o.querySelector(".place__like-button").addEventListener("click",(function(e){e.target.classList.toggle("place__like-button_active")})),o.querySelector(".place__delete-button").addEventListener("click",(function(e){e.target.closest(".place").remove()})),n.addEventListener("click",(function(){_.querySelector("img").src=t,_.querySelector(".popup__place-title").textContent=e,m(_)})),o}function f(e,t){var o=document.getElementById("".concat(e.id,"-error"));e.classList.remove(t.inputErrorClass),o.classList.remove(t.errorClass),o.textContent=""}function y(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);o.forEach((function(e){f(e,t)})),S(n,t)}function S(e,t){var o=t.inactiveButtonClass;e.classList.add(o),e.disabled=!0}function q(e,t,o){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e,t){var o=t.inactiveButtonClass;e.classList.remove(o),e.disabled=!1}(t,o):S(t,o)}var E,L=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),h=document.querySelector("#profile"),g=document.querySelector("#place"),b=p.querySelector(".popup__close-button"),C=l.querySelector(".popup__close-button"),x=_.querySelector(".popup__close-button");[{name:"гора Эльбрус",link:"https://35photo.pro/photos_main/1384/6922448.jpg"},{name:"Карелия",link:"https://35photo.pro/photos_main/1374/6870677.jpg"},{name:"Халактырский пляж, Камчатка",link:"https://35photo.pro/photos_main/1177/5889154.jpg"},{name:"Сулакский каньон, Дагестан",link:"https://35photo.pro/photos_main/1077/5387675.jpg"},{name:"Алтай",link:"https://35photo.pro/photos_main/1428/7141637.jpg"},{name:"Домбай",link:"https://35photo.pro/photos_main/768/3842757.jpg"}].forEach((function(e){c.prepend(v(e.name,e.link))})),b.addEventListener("click",(function(){d(p)})),C.addEventListener("click",(function(){d(l)})),x.addEventListener("click",(function(){d(_)})),h.addEventListener("submit",(function(e){e.preventDefault(),t.textContent=n.value,o.textContent=r.value,d(p)})),g.addEventListener("submit",(function(e){e.preventDefault(),c.insertAdjacentElement("afterbegin",v(u.value,i.value)),d(l)})),p.addEventListener("click",s),l.addEventListener("click",s),_.addEventListener("click",s),L.addEventListener("click",(function(){n.value=t.textContent,r.value=o.textContent,y(h,e),m(p)})),k.addEventListener("click",(function(){u.value="",i.value="",y(g,e),m(l)})),E=e,Array.from(document.querySelectorAll(E.formSelector)).forEach((function(e){!function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);q(o,n,t),o.forEach((function(e){e.addEventListener("input",(function(){(function(e,t){e.validity.valid?f(e,t):function(e,t,o){var n=document.getElementById("".concat(e.id,"-error"));e.classList.add(t.inputErrorClass),n.classList.add(t.errorClass),n.textContent=o}(e,t,e.validationMessage)})(e,t),q(o,n,t)}))}))}(e,E)}))})();
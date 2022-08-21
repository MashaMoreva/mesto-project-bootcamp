//функции валидации форм

export function showError(inputElement, selectors, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.classList.add(selectors.errorClass);
    errorElement.textContent = errorMessage;
};

export function hideError(inputElement, selectors) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
};

export function checkInputValidity(inputElement, selectors) {
    if (!inputElement.validity.valid) {
        showError(inputElement, selectors, inputElement.validationMessage);
    } else {
        hideError(inputElement, selectors);
    }
};

export function hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
    });
};

export function revalidateForm(formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    inputList.forEach(function (inputElement) {
        hideError(inputElement, selectors);
    });
    inactiveSubmitButton(buttonElement, selectors);
};

export function inactiveSubmitButton(buttonElement, { inactiveButtonClass }) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
};

export function activeSubmitButton(buttonElement, { inactiveButtonClass }) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
};

export function toggleButtonState(inputList, buttonElement, selectors) {
    if (hasInvalidInput(inputList)) {
        inactiveSubmitButton(buttonElement, selectors);
    } else {
        activeSubmitButton(buttonElement, selectors);
    };
};

export function setEventListeners(formElement, selectors) {
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

export function enableValidation(selectors) {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach(function (formElement) {
        setEventListeners(formElement, selectors);
    });
};
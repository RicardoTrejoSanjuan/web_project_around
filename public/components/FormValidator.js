export class FormValidator {
    constructor(config, formElement) {
        this.configs = config;
        this.formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        this.buttonElement = formElement.querySelector(config.submitButtonSelector);
    }
    showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        if (errorElement) {
            inputElement.classList.add(this.configs.inputErrorClass);
            errorElement.textContent = errorMessage;
            errorElement.classList.add(this.configs.errorClass);
        }
    }
    hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        if (errorElement) {
            inputElement.classList.remove(this.configs.inputErrorClass);
            errorElement.textContent = "";
            errorElement.classList.remove(this.configs.errorClass);
        }
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this.hideInputError(inputElement);
        }
    }
    hasInvalidInput() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }
    toggleButtonState() {
        if (this.hasInvalidInput()) {
            this.buttonElement.disabled = true;
        }
        else {
            this.buttonElement.disabled = false;
        }
    }
    setEventListeners() {
        this.toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this.checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this.setEventListeners();
    }
    resetValidation() {
        this.inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}

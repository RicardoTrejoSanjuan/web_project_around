import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this.submitHandler = (event) => {
            event.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        };
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        this.handleFormSubmit = handleFormSubmit;
    }
    open() {
        super.open();
        this.setEventListeners();
    }
    setInputValues(values) {
        this.inputList.forEach((input) => {
            const key = input.name;
            if (values[key] !== undefined) {
                input.value = values[key];
            }
        });
    }
    close() {
        super.close();
        this.submitButton.removeEventListener("click", this.submitHandler);
        this.formElement.reset();
    }
    setEventListeners() {
        super.setEventListeners();
        this.submitButton = this.popupElement.querySelector(".popup__button");
        this.submitButton.addEventListener("click", this.submitHandler);
    }
    getInputValues() {
        const values = {};
        this.inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
}

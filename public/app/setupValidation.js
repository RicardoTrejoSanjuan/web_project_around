import { FormValidator } from "../components/FormValidator.js";
export const setupValidation = (config) => {
    const validators = {};
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute("id");
        if (formName) {
            validators[formName] = validator;
        }
        validator.enableValidation();
    });
    return validators;
};

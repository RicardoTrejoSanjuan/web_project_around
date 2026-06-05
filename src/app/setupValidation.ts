import { FormValidator } from "../components/FormValidator.js";
import type { IValidationConfig } from "../types/types.js";

type ReturnFn = Record<string, FormValidator>;

export const setupValidation = (config: IValidationConfig): ReturnFn => {
  const validators: Record<string, FormValidator> = {};

  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement as HTMLFormElement);

    const formName = formElement.getAttribute("id");

    if (formName) {
      validators[formName] = validator;
    }

    validator.enableValidation();
  });

  return validators;
};

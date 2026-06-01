import type { IValidationConfig } from "../types/types.js";

export class FormValidator {
  private configs: IValidationConfig;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private buttonElement: HTMLButtonElement;

  constructor(config: IValidationConfig, formElement: HTMLFormElement) {
    this.configs = config;
    this.formElement = formElement;
    this.inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector),
    );
    this.buttonElement = formElement.querySelector(
      config.submitButtonSelector,
    ) as HTMLButtonElement;
  }

  private showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string,
  ): void {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`,
    ) as HTMLElement;
    if (errorElement) {
      inputElement.classList.add(this.configs.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.configs.errorClass);
    }
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`,
    ) as HTMLElement;
    if (errorElement) {
      inputElement.classList.remove(this.configs.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this.configs.errorClass);
    }
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  private hasInvalidInput(): boolean {
    return this.inputList.some((inputElement) => !inputElement.validity.valid);
  }

  private toggleButtonState(): void {
    if (this.hasInvalidInput()) {
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.disabled = false;
    }
  }

  private setEventListeners(): void {
    this.toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setEventListeners();
  }

  public resetValidation(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
    this.toggleButtonState();
  }
}

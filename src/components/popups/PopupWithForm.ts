import { Popup } from "./Popup.js";

type HandleFormSubmit<T> = (item: T) => void;

export class PopupWithForm<T> extends Popup {
  private formElement!: HTMLFormElement;
  private inputList!: HTMLInputElement[];
  private submitButton!: HTMLButtonElement;
  private handleFormSubmit: HandleFormSubmit<T>;

  constructor(selector: string, handleFormSubmit: HandleFormSubmit<T>) {
    super(selector);
    this.formElement = this.popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;

    this.inputList = Array.from(
      this.formElement.querySelectorAll(".popup__input"),
    );

    this.handleFormSubmit = handleFormSubmit;
  }

  public open(): void {
    super.open();
    this.setEventListeners();
  }

  public setInputValues(values: T): void {
    this.inputList.forEach((input: HTMLInputElement) => {
      const key = input.name as keyof T;
      if (values[key] !== undefined) {
        input.value = values[key] as string;
      }
    });
  }

  public close(): void {
    super.close();
    this.submitButton.removeEventListener("click", this.submitHandler);
    this.formElement.reset();
  }

  private submitHandler = (event: Event): void => {
    event.preventDefault();
    this.handleFormSubmit(this.getInputValues());
  };

  public setEventListeners(): void {
    super.setEventListeners();

    this.submitButton = this.popupElement.querySelector(
      ".popup__button",
    ) as HTMLButtonElement;

    this.submitButton.addEventListener("click", this.submitHandler);
  }

  public getInputValues(): T {
    const values: T = {} as T;
    this.inputList.forEach((input: HTMLInputElement) => {
      const key = input.name as keyof T;
      values[key] = input.value as unknown as T[typeof key];
    });
    return values;
  }

  public setButtonText(text: string): void {
    this.submitButton.textContent = text;
  }
}

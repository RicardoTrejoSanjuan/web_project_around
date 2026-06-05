import { selector } from "../../utils/constants.js";

export class Popup {
  protected popupElement!: HTMLElement;
  private closeButton!: HTMLButtonElement;

  constructor(popupSelector: string) {
    this.popupElement = document.querySelector(popupSelector) as HTMLElement;
    this.closeButton = this.popupElement.querySelector(
      selector.closeBtnSelector,
    ) as HTMLButtonElement;
  }

  private handleEscClose = (evt: KeyboardEvent): void => {
    if (
      evt.key === "Escape" &&
      this.popupElement.classList.contains(selector.isOpenedClass)
    ) {
      this.close();
    }
  };

  private handleOverlayClick = (evt: MouseEvent): void => {
    if (evt.target === this.popupElement) {
      this.close();
    }
  };

  private handleCloseButtonClick = (): void => {
    this.close();
  };

  public setEventListeners(): void {
    this.closeButton?.addEventListener("click", this.handleCloseButtonClick);
    this.popupElement.addEventListener("mousedown", this.handleOverlayClick);

    document.addEventListener("keydown", this.handleEscClose);
  }

  private removeEventListeners(): void {
    this.closeButton?.removeEventListener("click", this.handleCloseButtonClick);
    this.popupElement.removeEventListener("mousedown", this.handleOverlayClick);

    document.removeEventListener("keydown", this.handleEscClose);
  }

  public open(): void {
    this.popupElement.classList.add(selector.isOpenedClass);
  }

  public close(): void {
    this.popupElement.classList.remove(selector.isOpenedClass);
    this.removeEventListeners();
  }
}

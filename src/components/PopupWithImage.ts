import { Popup } from "./Popup.js";
import type { ICardData } from "../types/types.js";
import { selector } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(selector: string) {
    super(selector);
  }

  public setData({ name, link }: ICardData): void {
    const image = this.popupElement.querySelector(
      selector.popupImageSelector,
    ) as HTMLImageElement;
    const caption = this.popupElement.querySelector(
      selector.popupCaptionSelector,
    ) as HTMLElement;

    image.src = link;
    image.alt = name;
    caption.textContent = name;
  }

  public open(): void {
    super.open();
    this.setEventListeners();
  }
}

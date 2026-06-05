import { Card, PopupWithImage } from "../components/index.js";
import type { ICardData } from "../types/types.js";

type ReturnFn = (cardData: ICardData) => HTMLElement;

/**
 * Creates a card element and configures the image preview popup.
 *
 * @param imagePopup - Image popup instance.
 * @returns {ReturnFn} A function that generates a card HTMLElement.
 */
export const createCardFactory = (imagePopup: PopupWithImage): ReturnFn => {
  return (cardData: ICardData): HTMLElement => {
    const card = new Card(cardData, "#card-template", () => {
      imagePopup.setData(cardData);
      imagePopup.open();
    });
    return card.generateCard();
  };
};

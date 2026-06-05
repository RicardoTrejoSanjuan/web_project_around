import { Api } from "./Api.js";
import type { ICardData } from "../types/types.js";
import { apiConfig } from "../utils/constants.js";
import { PopupWithForm } from "./popups/PopupWithForm.js";

export class Card {
  private selector: string;
  private element!: HTMLElement;
  private item: ICardData;
  private handleCardClick: () => void;
  private cardImage!: HTMLImageElement;
  private likeButton!: HTMLButtonElement;
  private deleteButton!: HTMLButtonElement;
  private title!: HTMLElement;
  private api: Api;

  constructor(item: ICardData, selector: string, handleCardClick: () => void) {
    this.selector = selector;
    this.item = item;
    this.handleCardClick = handleCardClick;
    this.api = new Api(apiConfig);
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(
      this.selector,
    ) as HTMLTemplateElement;

    const cardElement = cardTemplate.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;

    return cardElement;
  }

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();
    this.cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;
    this.likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;
    this.deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLButtonElement;
    this.title = this.element.querySelector(".card__title") as HTMLElement;

    this.cardImage.src = this.item.link;
    this.cardImage.alt = this.item.name;
    this.title.textContent = this.item.name;

    this.setEventListeners();
    this.setLikeButtonState();
    return this.element;
  }

  private setEventListeners(): void {
    this.likeButton.addEventListener("click", () => this.handleLike());
    this.deleteButton.addEventListener("click", () => this.handleDelete());
    this.cardImage.addEventListener("click", () => {
      this.handleCardClick();
    });
  }

  // Handle like button click
  private async handleLike(): Promise<void> {
    try {
      if (this.item.isLiked) {
        this.item = await this.api.unlikeCard(this.item._id);
      } else {
        this.item = await this.api.likeCard(this.item._id);
      }
      this.setLikeButtonState();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Set like button state
  private setLikeButtonState(): void {
    if (this.item.isLiked) {
      this.likeButton.classList.add("card__like-button_is-active");
    } else {
      this.likeButton.classList.remove("card__like-button_is-active");
    }
  }

  // Event listener for delete button
  private handleDelete(): void {
    const deletePopup = new PopupWithForm("#delete-popup", async () => {
      try {
        deletePopup.setButtonText("Eliminando...");
        await this.api.deleteCard(this.item._id);
        this.element.remove();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        deletePopup.setButtonText("Sí");
        deletePopup.close();
      }
    });
    deletePopup.open();
  }
}

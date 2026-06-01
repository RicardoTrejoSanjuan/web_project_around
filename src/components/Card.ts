import type { ICardData } from "../types/types.js";

export class Card {
  private selector: string;
  private element!: HTMLElement;
  private item: ICardData;
  private handleCardClick: () => void;
  private cardImage!: HTMLImageElement;
  private likeButton!: HTMLButtonElement;
  private deleteButton!: HTMLButtonElement;
  private title!: HTMLElement;

  constructor(item: ICardData, selector: string, handleCardClick: () => void) {
    this.selector = selector;
    this.item = item;
    this.handleCardClick = handleCardClick;
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
    return this.element;
  }

  private setEventListeners(): void {
    this.likeButton.addEventListener("click", () => this.handleLike());
    this.deleteButton.addEventListener("click", () => this.handleDelete());
    this.cardImage.addEventListener("click", () => {
      this.handleCardClick();
    });
  }

  // Event listener for like button
  private handleLike(): void {
    this.likeButton.classList.toggle("card__like-button_is-active");
  }

  // Event listener for delete button
  private handleDelete(): void {
    this.element.remove();
  }
}

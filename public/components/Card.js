export class Card {
    constructor(item, selector, handleCardClick) {
        this.selector = selector;
        this.item = item;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.selector);
        const cardElement = cardTemplate.content
            .querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this.element = this.getTemplate();
        this.cardImage = this.element.querySelector(".card__image");
        this.likeButton = this.element.querySelector(".card__like-button");
        this.deleteButton = this.element.querySelector(".card__delete-button");
        this.title = this.element.querySelector(".card__title");
        this.cardImage.src = this.item.link;
        this.cardImage.alt = this.item.name;
        this.title.textContent = this.item.name;
        this.setEventListeners();
        return this.element;
    }
    setEventListeners() {
        this.likeButton.addEventListener("click", () => this.handleLike());
        this.deleteButton.addEventListener("click", () => this.handleDelete());
        this.cardImage.addEventListener("click", () => {
            this.handleCardClick();
        });
    }
    // Event listener for like button
    handleLike() {
        this.likeButton.classList.toggle("card__like-button_is-active");
    }
    // Event listener for delete button
    handleDelete() {
        this.element.remove();
    }
}

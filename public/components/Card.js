var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Api } from "./Api.js";
import { apiConfig } from "../utils/constants.js";
import { PopupWithForm } from "./popups/PopupWithForm.js";
export class Card {
    constructor(item, selector, handleCardClick) {
        this.selector = selector;
        this.item = item;
        this.handleCardClick = handleCardClick;
        this.api = new Api(apiConfig);
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
        this.setLikeButtonState();
        return this.element;
    }
    setEventListeners() {
        this.likeButton.addEventListener("click", () => this.handleLike());
        this.deleteButton.addEventListener("click", () => this.handleDelete());
        this.cardImage.addEventListener("click", () => {
            this.handleCardClick();
        });
    }
    // Handle like button click
    handleLike() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.item.isLiked) {
                    this.item = yield this.api.unlikeCard(this.item._id);
                }
                else {
                    this.item = yield this.api.likeCard(this.item._id);
                }
                this.setLikeButtonState();
            }
            catch (error) {
                console.error("Error:", error);
            }
        });
    }
    // Set like button state
    setLikeButtonState() {
        if (this.item.isLiked) {
            this.likeButton.classList.add("card__like-button_is-active");
        }
        else {
            this.likeButton.classList.remove("card__like-button_is-active");
        }
    }
    // Event listener for delete button
    handleDelete() {
        const deletePopup = new PopupWithForm("#delete-popup", () => __awaiter(this, void 0, void 0, function* () {
            try {
                deletePopup.setButtonText("Eliminando...");
                yield this.api.deleteCard(this.item._id);
                this.element.remove();
            }
            catch (error) {
                console.error("Error:", error);
            }
            finally {
                deletePopup.setButtonText("Sí");
                deletePopup.close();
            }
        }));
        deletePopup.open();
    }
}

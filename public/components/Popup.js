import { selector } from "../utils/constants.js";
export class Popup {
    constructor(popupSelector) {
        this.handleEscClose = (evt) => {
            if (evt.key === "Escape" &&
                this.popupElement.classList.contains(selector.isOpenedClass)) {
                this.close();
            }
        };
        this.handleOverlayClick = (evt) => {
            if (evt.target === this.popupElement) {
                this.close();
            }
        };
        this.handleCloseButtonClick = () => {
            this.close();
        };
        this.popupElement = document.querySelector(popupSelector);
        this.closeButton = this.popupElement.querySelector(selector.closeBtnSelector);
    }
    setEventListeners() {
        var _a;
        (_a = this.closeButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.handleCloseButtonClick);
        this.popupElement.addEventListener("mousedown", this.handleOverlayClick);
        document.addEventListener("keydown", this.handleEscClose);
    }
    removeEventListeners() {
        var _a;
        (_a = this.closeButton) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this.handleCloseButtonClick);
        this.popupElement.removeEventListener("mousedown", this.handleOverlayClick);
        document.removeEventListener("keydown", this.handleEscClose);
    }
    open() {
        this.popupElement.classList.add(selector.isOpenedClass);
    }
    close() {
        this.popupElement.classList.remove(selector.isOpenedClass);
        this.removeEventListeners();
    }
}

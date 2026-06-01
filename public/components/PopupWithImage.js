import { Popup } from "./Popup.js";
import { selector } from "../utils/constants.js";
export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }
    setData({ name, link }) {
        const image = this.popupElement.querySelector(selector.popupImageSelector);
        const caption = this.popupElement.querySelector(selector.popupCaptionSelector);
        image.src = link;
        image.alt = name;
        caption.textContent = name;
    }
    open() {
        super.open();
        this.setEventListeners();
    }
}

import { initialCards, defaultFormConfig } from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { Card } from "./components/Card.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { editProfileBtn, addCardBtn } from "./utils/utils.js";
import { FormValidator } from "./components/FormValidator.js";
const main = () => {
    initialCards.forEach(({ name }) => console.log(name));
    /* Image Popup Instance */
    const imagePopup = new PopupWithImage("#image-popup");
    /* Card Section Helper to create a single card */
    const createCard = (cardData) => {
        const card = new Card(cardData, "#card-template", () => {
            imagePopup.setData(cardData);
            imagePopup.open();
        });
        return card.generateCard();
    };
    /* User Info Instance */
    const userInfo = new UserInfo({
        name: ".profile__title",
        description: ".profile__description",
    });
    /* Section Instance */
    const cardSection = new Section({
        items: initialCards,
        renderer: (cardData) => {
            const cardElement = createCard(cardData);
            cardSection.addItem(cardElement, "append");
        },
    }, ".cards__list");
    /* Render initial cards */
    cardSection.renderItems();
    // Edit Profile Popup
    const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
        userInfo.setUserInfo(inputValues);
        editProfilePopup.close();
    });
    // Add Card Popup
    const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
        const cardElement = createCard(inputValues);
        cardSection.addItem(cardElement, "prepend");
        addCardPopup.close();
    });
    // --- Form Validation ---
    const formValidators = {};
    const enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector));
        formList.forEach((formElement) => {
            const validator = new FormValidator(config, formElement);
            const formName = formElement.getAttribute("id");
            if (formName) {
                formValidators[formName] = validator;
            }
            validator.enableValidation();
        });
    };
    enableValidation(defaultFormConfig);
    /* --- Listeners de Apertura de Popups --- */
    const profileEditBtn = editProfileBtn();
    profileEditBtn.addEventListener("click", () => {
        var _a;
        const info = userInfo.getUserInfo();
        editProfilePopup.setInputValues(info);
        (_a = formValidators["edit-profile-form"]) === null || _a === void 0 ? void 0 : _a.resetValidation();
        editProfilePopup.open();
    });
    const profileAddCardBtn = addCardBtn();
    profileAddCardBtn.addEventListener("click", () => {
        var _a;
        (_a = formValidators["new-card-form"]) === null || _a === void 0 ? void 0 : _a.resetValidation();
        addCardPopup.open();
    });
};
document.addEventListener("DOMContentLoaded", main);

import { initialCards, defaultFormConfig } from "./utils/constants.js";
import type { ICardData, IUserInfo, IValidationConfig } from "./types/types.js";
import { Section } from "./components/Section.js";
import { Card } from "./components/Card.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { editProfileBtn, addCardBtn } from "./utils/utils.js";
import { FormValidator } from "./components/FormValidator.js";

const main = () => {
  initialCards.forEach(({ name }: ICardData) => console.log(name));

  /* Image Popup Instance */
  const imagePopup = new PopupWithImage("#image-popup");

  /* Card Section Helper to create a single card */
  const createCard = (cardData: ICardData): HTMLElement => {
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
  const cardSection = new Section<ICardData>(
    {
      items: initialCards,
      renderer: (cardData: ICardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement, "append");
      },
    },
    ".cards__list",
  );

  /* Render initial cards */
  cardSection.renderItems();

  // Edit Profile Popup
  const editProfilePopup = new PopupWithForm<IUserInfo>(
    "#edit-popup",
    (inputValues: IUserInfo) => {
      userInfo.setUserInfo(inputValues);
      editProfilePopup.close();
    },
  );

  // Add Card Popup
  const addCardPopup = new PopupWithForm<ICardData>(
    "#new-card-popup",
    (inputValues: ICardData) => {
      const cardElement = createCard({
        name: inputValues["place-name"] || "",
        link: inputValues.link,
      });
      cardSection.addItem(cardElement, "prepend");
      addCardPopup.close();
    },
  );

  // --- Form Validation ---
  const formValidators: Record<string, FormValidator> = {};

  const enableValidation = (config: IValidationConfig) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(
        config,
        formElement as HTMLFormElement,
      );
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
    const info: IUserInfo = userInfo.getUserInfo();
    editProfilePopup.setInputValues(info);
    formValidators["edit-profile-form"]?.resetValidation();
    editProfilePopup.open();
  });

  const profileAddCardBtn = addCardBtn();
  profileAddCardBtn.addEventListener("click", () => {
    formValidators["new-card-form"]?.resetValidation();
    addCardPopup.open();
  });
};

document.addEventListener("DOMContentLoaded", main);

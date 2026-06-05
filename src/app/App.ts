import {
  UserInfo,
  Section,
  PopupWithImage,
  PopupWithForm,
} from "../components/index.js";

import { apiConfig } from "../utils/constants.js";
import { defaultFormConfig } from "../utils/constants.js";

import { createCardFactory } from "./createCardFactory.js";
import { setupValidation } from "./setupValidation.js";
import { setupEventListeners } from "./setupEventListeners.js";

import type { ICardData, IUserInfo } from "../types/types.js";
import { Api } from "../components/Api.js";

/**
 * Coordinates application initialization, data loading,
 * UI components, and event handlers.
 */
export class App {
  private userInfo: UserInfo;
  private api: Api;
  private cards: ICardData[] = [];

  /**
   * Creates a new App instance and initializes services.
   */
  constructor() {
    this.api = new Api(apiConfig);
    this.userInfo = new UserInfo({
      name: ".profile__title",
      description: ".profile__description",
      avatar: ".profile__image",
    });
  }

  /**
   * Loads user data and initial cards from the API.
   *
   * @returns Promise that resolves when data is loaded.
   */
  public async loadData(): Promise<void> {
    try {
      const [userData, initialCards] = await Promise.all([
        this.api.getUserInfo(),
        this.api.getInitialCards(),
      ]);
      this.cards = initialCards;
      this.userInfo.setUserInfo(userData);
    } catch (err) {
      console.error("Fallo al cargar datos iniciales:", err);
    }
  }

  /**
   * Initializes the application components and event listeners.
   */
  public init(): void {
    /* Image Popup Instance */
    const imagePopup = new PopupWithImage("#image-popup");

    /* Create Card Factory */
    const createCard = createCardFactory(imagePopup);

    /* Section Instance */
    const cardSection = new Section<ICardData>(
      {
        items: this.cards,
        renderer: (cardData: ICardData) => {
          const cardElement = createCard(cardData);
          cardSection.addItem(cardElement, "append");
        },
      },
      ".cards__list",
    );

    /* Render initial cards */
    cardSection.renderItems();

    /* Edit Profile Popup Instance */
    const editProfilePopup = new PopupWithForm<IUserInfo>(
      "#edit-popup",
      async (inputValues: IUserInfo) => {
        try {
          editProfilePopup.setButtonText("Guardando...");
          const res: IUserInfo = await this.api.updateUserInfo(inputValues);
          this.userInfo.setUserInfo(res);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          editProfilePopup.setButtonText("Guardar");
          editProfilePopup.close();
        }
      },
    );

    /* Add Card Popup Instance */
    const addCardPopup = new PopupWithForm<ICardData>(
      "#new-card-popup",
      async (values) => {
        try {
          addCardPopup.setButtonText("Creando...");
          const res: ICardData = await this.api.createCard({
            name: values["place-name"] || "",
            link: values.link,
          });
          const card = createCard(res);

          cardSection.addItem(card, "prepend");
        } catch (error) {
          console.error("Error:", error);
        } finally {
          addCardPopup.setButtonText("Crear");
          addCardPopup.close();
        }
      },
    );

    /* Avatar Popup Instance */
    const avatarPopup = new PopupWithForm<IUserInfo>(
      "#edit-avatar-popup",
      async (inputValues: IUserInfo) => {
        try {
          avatarPopup.setButtonText("Guardando...");
          const res: IUserInfo = await this.api.editAvatar(inputValues);
          this.userInfo.setUserInfo(res);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          avatarPopup.setButtonText("Guardar");
          avatarPopup.close();
        }
      },
    );

    /* Form Validation Instances */
    const validators = setupValidation(defaultFormConfig);

    setupEventListeners({
      userInfo: this.userInfo!,
      editProfilePopup,
      addCardPopup,
      avatarPopup,
      validators,
    });
  }
}

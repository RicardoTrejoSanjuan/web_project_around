var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserInfo, Section, PopupWithImage, PopupWithForm, } from "../components/index.js";
import { apiConfig } from "../utils/constants.js";
import { defaultFormConfig } from "../utils/constants.js";
import { createCardFactory } from "./createCardFactory.js";
import { setupValidation } from "./setupValidation.js";
import { setupEventListeners } from "./setupEventListeners.js";
import { Api } from "../components/Api.js";
/**
 * Coordinates application initialization, data loading,
 * UI components, and event handlers.
 */
export class App {
    /**
     * Creates a new App instance and initializes services.
     */
    constructor() {
        this.cards = [];
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
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [userData, initialCards] = yield Promise.all([
                    this.api.getUserInfo(),
                    this.api.getInitialCards(),
                ]);
                this.cards = initialCards;
                this.userInfo.setUserInfo(userData);
            }
            catch (err) {
                console.error("Fallo al cargar datos iniciales:", err);
            }
        });
    }
    /**
     * Initializes the application components and event listeners.
     */
    init() {
        /* Image Popup Instance */
        const imagePopup = new PopupWithImage("#image-popup");
        /* Create Card Factory */
        const createCard = createCardFactory(imagePopup);
        /* Section Instance */
        const cardSection = new Section({
            items: this.cards,
            renderer: (cardData) => {
                const cardElement = createCard(cardData);
                cardSection.addItem(cardElement, "append");
            },
        }, ".cards__list");
        /* Render initial cards */
        cardSection.renderItems();
        /* Edit Profile Popup Instance */
        const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => __awaiter(this, void 0, void 0, function* () {
            try {
                editProfilePopup.setButtonText("Guardando...");
                const res = yield this.api.updateUserInfo(inputValues);
                this.userInfo.setUserInfo(res);
            }
            catch (error) {
                console.error("Error:", error);
            }
            finally {
                editProfilePopup.setButtonText("Guardar");
                editProfilePopup.close();
            }
        }));
        /* Add Card Popup Instance */
        const addCardPopup = new PopupWithForm("#new-card-popup", (values) => __awaiter(this, void 0, void 0, function* () {
            try {
                addCardPopup.setButtonText("Creando...");
                const res = yield this.api.createCard({
                    name: values["place-name"] || "",
                    link: values.link,
                });
                const card = createCard(res);
                cardSection.addItem(card, "prepend");
            }
            catch (error) {
                console.error("Error:", error);
            }
            finally {
                addCardPopup.setButtonText("Crear");
                addCardPopup.close();
            }
        }));
        /* Avatar Popup Instance */
        const avatarPopup = new PopupWithForm("#edit-avatar-popup", (inputValues) => __awaiter(this, void 0, void 0, function* () {
            try {
                avatarPopup.setButtonText("Guardando...");
                const res = yield this.api.editAvatar(inputValues);
                this.userInfo.setUserInfo(res);
            }
            catch (error) {
                console.error("Error:", error);
            }
            finally {
                avatarPopup.setButtonText("Guardar");
                avatarPopup.close();
            }
        }));
        /* Form Validation Instances */
        const validators = setupValidation(defaultFormConfig);
        setupEventListeners({
            userInfo: this.userInfo,
            editProfilePopup,
            addCardPopup,
            avatarPopup,
            validators,
        });
    }
}

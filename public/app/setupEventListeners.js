import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/index.js";
import { addCardBtn, editProfileBtn, profileAvatarButton, } from "../utils/selectors.js";
/**
 * Sets up event listeners for editing user profile and adding a new card.
 * @param {SetupEventListenersProps}  - The `setupEventListeners` function takes in an
 * object with the following properties:
 */
export const setupEventListeners = ({ userInfo, editProfilePopup, addCardPopup, avatarPopup, validators, }) => {
    editProfileBtn().addEventListener("click", () => {
        var _a;
        const info = userInfo.getUserInfo();
        editProfilePopup.setInputValues(info);
        (_a = validators["edit-profile-form"]) === null || _a === void 0 ? void 0 : _a.resetValidation();
        editProfilePopup.open();
    });
    addCardBtn().addEventListener("click", () => {
        var _a;
        (_a = validators["new-card-form"]) === null || _a === void 0 ? void 0 : _a.resetValidation();
        addCardPopup.open();
    });
    profileAvatarButton().addEventListener("click", () => {
        var _a;
        (_a = validators["edit-avatar-form"]) === null || _a === void 0 ? void 0 : _a.resetValidation();
        avatarPopup.open();
    });
};

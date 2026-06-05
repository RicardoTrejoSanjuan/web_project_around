import type { ICardData, IUserInfo } from "../types/types.js";
import type { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/index.js";
import {
  addCardBtn,
  editProfileBtn,
  profileAvatarButton,
} from "../utils/selectors.js";

interface SetupEventListenersProps {
  userInfo: UserInfo;
  editProfilePopup: PopupWithForm<IUserInfo>;
  addCardPopup: PopupWithForm<ICardData>;
  avatarPopup: PopupWithForm<IUserInfo>;
  validators: Record<string, FormValidator>;
}

/**
 * Sets up event listeners for editing user profile and adding a new card.
 * @param {SetupEventListenersProps}  - The `setupEventListeners` function takes in an
 * object with the following properties:
 */
export const setupEventListeners = ({
  userInfo,
  editProfilePopup,
  addCardPopup,
  avatarPopup,
  validators,
}: SetupEventListenersProps) => {
  editProfileBtn().addEventListener("click", () => {
    const info: IUserInfo = userInfo.getUserInfo();
    editProfilePopup.setInputValues(info);
    validators["edit-profile-form"]?.resetValidation();
    editProfilePopup.open();
  });

  addCardBtn().addEventListener("click", () => {
    validators["new-card-form"]?.resetValidation();
    addCardPopup.open();
  });

  profileAvatarButton().addEventListener("click", () => {
    validators["edit-avatar-form"]?.resetValidation();
    avatarPopup.open();
  });
};

const profileContent = document.querySelector(".profile") as HTMLElement;

/**
 * Returns the profile edit button element.
 */
export const editProfileBtn = (): HTMLButtonElement =>
  profileContent.querySelector(".profile__edit-button") as HTMLButtonElement;

/**
 * Returns the add card button element.
 */
export const addCardBtn = (): HTMLButtonElement =>
  profileContent.querySelector(".profile__add-button") as HTMLButtonElement;

/**
 * Returns the profile avatar button element.
 */
export const profileAvatarButton = (): HTMLButtonElement =>
  profileContent.querySelector(".profile__avatar-button") as HTMLButtonElement;

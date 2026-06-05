const profileContent = document.querySelector(".profile");
// export const editProfileBtn = (): HTMLButtonElement => {
//   const profileEditBtn = profileContent.querySelector(
//     ".profile__edit-button",
//   ) as HTMLButtonElement;
//   return profileEditBtn;
// };
// export const addCardBtn = (): HTMLButtonElement => {
//   const profileAddCardBtn = profileContent.querySelector(
//     ".profile__add-button",
//   ) as HTMLButtonElement;
//   return profileAddCardBtn;
// };
export const editProfileBtn = () => profileContent.querySelector(".profile__edit-button");
export const addCardBtn = () => profileContent.querySelector(".profile__add-button");

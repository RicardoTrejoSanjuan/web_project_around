export const placeholderImage = "./public/images/placeholder.jpg";
export const withoutText = "Sin título";
export const defaultFormConfig = {
    // Form Selector
    formSelector: ".popup__form",
    // inputs
    inputSelector: ".popup__input",
    // Button Submit
    submitButtonSelector: ".popup__button",
    // Button Disabled Class
    inactiveButtonClass: "popup__button_disabled",
    // Input Error Class
    inputErrorClass: "popup__input_type_error",
    // Errors Class
    errorClass: "popup__error_visible",
};
export const selector = {
    // Image / Caption - Popup Selectors
    popupImageSelector: ".popup__image",
    popupCaptionSelector: ".popup__caption",
    // Close Button Popup
    closeBtnSelector: ".popup__close",
    // Is Opened Class
    isOpenedClass: "popup_is-opened",
};
export const apiConfig = {
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "0eb2eccc-2f17-46a0-8165-2b6720560b6c",
        "Content-Type": "application/json",
    },
};

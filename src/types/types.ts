export interface INamedEntity {
  name: string;
}

export interface ICardData extends INamedEntity {
  link: string;
  "place-name"?: string;
}

export interface IUserInfo extends INamedEntity {
  description: string;
}

export interface FormValues {
  [key: string]: string;
}

export interface IValidationConfig {
  formSelector: string;
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

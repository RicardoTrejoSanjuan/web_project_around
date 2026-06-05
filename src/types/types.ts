export interface ICardData {
  isLiked: boolean;
  name: string;
  _id: string;
  link: string;
  owner: string;
  createdAt: string;
  "place-name"?: string;
}

export interface IUserInfo {
  about: string;
  avatar: string;
  name: string;
  description?: string;
  _id: string;
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

export interface IApiConfig {
  baseUrl: string;
  headers: Record<string, string>;
}

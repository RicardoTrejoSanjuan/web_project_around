import type { IUserInfo } from "../types/types";

export class UserInfo {
  private nameElement!: HTMLElement;
  private descriptionElement!: HTMLElement;

  constructor(info: IUserInfo) {
    this.nameElement = document.querySelector(info.name) as HTMLElement;
    this.descriptionElement = document.querySelector(
      info.description,
    ) as HTMLElement;
  }

  public getUserInfo(): IUserInfo {
    return {
      name: this.nameElement.textContent || "",
      description: this.descriptionElement.textContent || "",
    };
  }

  public setUserInfo(user: IUserInfo): void {
    this.nameElement.textContent = user.name;
    this.descriptionElement.textContent = user.description;
  }
}

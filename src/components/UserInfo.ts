import type { IUserInfo } from "../types/types";

type TUserInfoSelector = {
  name: string;
  description: string;
  avatar: string;
};

/**
 * Manages user information and synchronizes it with the UI.
 */
export class UserInfo {
  private user: IUserInfo = {} as IUserInfo;
  private nameElement!: HTMLElement;
  private descriptionElement!: HTMLElement;
  private avatarElement!: HTMLImageElement;

  /**
   * Creates a new UserInfo instance.
   *
   * @param info - Selectors for user information elements.
   */
  constructor(info: TUserInfoSelector) {
    this.nameElement = document.querySelector(info.name) as HTMLElement;
    this.descriptionElement = document.querySelector(
      info.description,
    ) as HTMLElement;
    this.avatarElement = document.querySelector(
      info.avatar,
    ) as HTMLImageElement;
  }

  /**
   * Retrieves the current user information.
   *
   * @returns User information.
   */
  public getUserInfo(): IUserInfo {
    return {
      ...this.user,
      description: this.user.about,
    };
  }

  /**
   * Updates the user information and synchronizes it with the UI.
   *
   * @param user - User data to update.
   */
  public setUserInfo(user: IUserInfo): void {
    this.user = user;
    this.nameElement.textContent = user.name;
    this.descriptionElement.textContent = user.about;
    this.avatarElement.src = user.avatar;
  }
}

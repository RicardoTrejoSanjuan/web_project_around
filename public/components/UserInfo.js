/**
 * Manages user information and synchronizes it with the UI.
 */
export class UserInfo {
    /**
     * Creates a new UserInfo instance.
     *
     * @param info - Selectors for user information elements.
     */
    constructor(info) {
        this.user = {};
        this.nameElement = document.querySelector(info.name);
        this.descriptionElement = document.querySelector(info.description);
        this.avatarElement = document.querySelector(info.avatar);
    }
    /**
     * Retrieves the current user information.
     *
     * @returns User information.
     */
    getUserInfo() {
        return Object.assign(Object.assign({}, this.user), { description: this.user.about });
    }
    /**
     * Updates the user information and synchronizes it with the UI.
     *
     * @param user - User data to update.
     */
    setUserInfo(user) {
        this.user = user;
        this.nameElement.textContent = user.name;
        this.descriptionElement.textContent = user.about;
        this.avatarElement.src = user.avatar;
    }
}

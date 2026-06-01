export class UserInfo {
    constructor(info) {
        this.nameElement = document.querySelector(info.name);
        this.descriptionElement = document.querySelector(info.description);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || "",
            description: this.descriptionElement.textContent || "",
        };
    }
    setUserInfo(user) {
        this.nameElement.textContent = user.name;
        this.descriptionElement.textContent = user.description;
    }
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Handles communication with the REST API.
 */
export class Api {
    /**
     * Creates a new API client instance.
     *
     * @param config - API configuration.
     */
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    /**
     * Performs an API request with error handling.
     *
     * @param endpoint - API endpoint.
     * @param options - Fetch options.
     * @returns Promise with the response data.
     */
    request(endpoint, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}${endpoint}`, Object.assign({ headers: this.headers }, options));
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        });
    }
    /**
     * Retrieves user profile information.
     *
     * @returns Promise with user information.
     */
    getUserInfo() {
        return this.request("/users/me");
    }
    /**
     * Retrieves initial card data.
     *
     * @returns Promise with an array of card data.
     */
    getInitialCards() {
        return this.request("/cards");
    }
    /**
     * Updates user information.
     *
     * @param user - User data to update.
     * @returns Promise with updated user information.
     */
    updateUserInfo(user) {
        return this.request("/users/me", {
            method: "PATCH",
            body: JSON.stringify({
                name: user.name,
                about: user.description,
            }),
        });
    }
    /**
     * Creates a new card.
     *
     * @param data - Card data.
     * @returns Promise with the created card.
     */
    createCard(data) {
        return this.request("/cards", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        });
    }
    /**
     * Deletes a card.
     *
     * @param cardId - Card ID to delete.
     * @returns Promise with no return value.
     */
    deleteCard(cardId) {
        return this.request(`/cards/${cardId}`, {
            method: "DELETE",
        });
    }
    /**
     * Likes a card.
     *
     * @param cardId - Card ID to like.
     * @returns Promise with the card data.
     */
    likeCard(cardId) {
        return this.request(`/cards/${cardId}/likes`, {
            method: "PUT",
        });
    }
    /**
     * Unlikes a card.
     *
     * @param cardId - Card ID to unlike.
     * @returns Promise with the card data.
     */
    unlikeCard(cardId) {
        return this.request(`/cards/${cardId}/likes`, {
            method: "DELETE",
        });
    }
    /**
     * Edits the user's avatar.
     *
     * @param avatar - User avatar data.
     * @returns Promise with updated user information.
     */
    editAvatar(avatar) {
        return this.request("/users/me/avatar", {
            method: "PATCH",
            body: JSON.stringify({
                avatar: avatar.avatar,
            }),
        });
    }
}

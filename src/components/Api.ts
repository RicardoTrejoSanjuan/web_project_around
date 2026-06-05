import type { IApiConfig, ICardData, IUserInfo } from "../types/types.js";

/**
 * Handles communication with the REST API.
 */
export class Api {
  private baseUrl: string;
  private headers: Record<string, string>;

  /**
   * Creates a new API client instance.
   *
   * @param config - API configuration.
   */
  constructor({ baseUrl, headers }: IApiConfig) {
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
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const res: Response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return res.json();
  }

  /**
   * Retrieves user profile information.
   *
   * @returns Promise with user information.
   */
  public getUserInfo(): Promise<IUserInfo> {
    return this.request<IUserInfo>("/users/me");
  }

  /**
   * Retrieves initial card data.
   *
   * @returns Promise with an array of card data.
   */
  public getInitialCards(): Promise<ICardData[]> {
    return this.request<ICardData[]>("/cards");
  }

  /**
   * Updates user information.
   *
   * @param user - User data to update.
   * @returns Promise with updated user information.
   */
  public updateUserInfo(user: IUserInfo): Promise<IUserInfo> {
    return this.request<IUserInfo>("/users/me", {
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
  public createCard(data: Partial<ICardData>): Promise<ICardData> {
    return this.request<ICardData>("/cards", {
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
  public deleteCard(cardId: string): Promise<void> {
    return this.request<void>(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  /**
   * Likes a card.
   *
   * @param cardId - Card ID to like.
   * @returns Promise with the card data.
   */
  public likeCard(cardId: string): Promise<ICardData> {
    return this.request<ICardData>(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  /**
   * Unlikes a card.
   *
   * @param cardId - Card ID to unlike.
   * @returns Promise with the card data.
   */
  public unlikeCard(cardId: string): Promise<ICardData> {
    return this.request<ICardData>(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  /**
   * Edits the user's avatar.
   *
   * @param avatar - User avatar data.
   * @returns Promise with updated user information.
   */
  public editAvatar(avatar: IUserInfo): Promise<IUserInfo> {
    return this.request<IUserInfo>("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    });
  }
}

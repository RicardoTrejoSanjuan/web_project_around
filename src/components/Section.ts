interface ISection<T> {
  items: Array<T>;
  renderer: (item: T) => void;
}

type Position = "append" | "prepend";

/**
 * Manages rendering and insertion of elements into a container.
 */
export class Section<T> {
  private items: Array<T>;
  private renderer: (item: T) => void;
  private container: HTMLElement;

  /**
   * Creates a new Section instance.
   *
   * @param data - Section data containing items and a renderer function.
   * @param selector - CSS selector for the container element.
   */
  constructor({ items, renderer }: ISection<T>, selector: string) {
    this.container = document.querySelector(selector) as HTMLElement;
    this.renderer = renderer;
    this.items = items;
  }

  /**
   * Clears all content from the container.
   */
  public clear(): void {
    this.container.innerHTML = "";
  }

  /**
   * Adds an element to the container.
   *
   * @param element - Element to add.
   * @param position - Position to add the element (append or prepend).
   */
  public addItem(element: HTMLElement, position: Position = "append"): void {
    if (position === "prepend") {
      this.container.prepend(element);
    } else {
      this.container.append(element);
    }
  }

  /**
   * Clears the container and renders all items using the renderer function.
   */
  public renderItems(): void {
    this.clear();
    this.items.forEach((item: T) => this.renderer(item));
  }
}

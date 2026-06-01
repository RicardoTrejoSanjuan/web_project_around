interface ISection<T> {
  items: Array<T>;
  renderer: (item: T) => void;
}

type Position = "append" | "prepend";

export class Section<T> {
  private items: Array<T>;
  private renderer: (item: T) => void;
  private container: HTMLElement;

  constructor({ items, renderer }: ISection<T>, selector: string) {
    this.container = document.querySelector(selector) as HTMLElement;
    this.renderer = renderer;
    this.items = items;
  }

  public clear(): void {
    this.container.innerHTML = "";
  }

  public addItem(element: HTMLElement, position: Position = "append"): void {
    if (position === "prepend") {
      this.container.prepend(element);
    } else {
      this.container.append(element);
    }
  }

  public renderItems(): void {
    this.clear();
    this.items.forEach((item: T) => this.renderer(item));
  }
}

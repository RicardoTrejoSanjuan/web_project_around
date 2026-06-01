export class Section {
    constructor({ items, renderer }, selector) {
        this.container = document.querySelector(selector);
        this.renderer = renderer;
        this.items = items;
    }
    clear() {
        this.container.innerHTML = "";
    }
    addItem(element, position = "append") {
        if (position === "prepend") {
            this.container.prepend(element);
        }
        else {
            this.container.append(element);
        }
    }
    renderItems() {
        this.clear();
        this.items.forEach((item) => this.renderer(item));
    }
}

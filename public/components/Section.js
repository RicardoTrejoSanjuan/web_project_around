/**
 * Manages rendering and insertion of elements into a container.
 */
export class Section {
    /**
     * Creates a new Section instance.
     *
     * @param data - Section data containing items and a renderer function.
     * @param selector - CSS selector for the container element.
     */
    constructor({ items, renderer }, selector) {
        this.container = document.querySelector(selector);
        this.renderer = renderer;
        this.items = items;
    }
    /**
     * Clears all content from the container.
     */
    clear() {
        this.container.innerHTML = "";
    }
    /**
     * Adds an element to the container.
     *
     * @param element - Element to add.
     * @param position - Position to add the element (append or prepend).
     */
    addItem(element, position = "append") {
        if (position === "prepend") {
            this.container.prepend(element);
        }
        else {
            this.container.append(element);
        }
    }
    /**
     * Clears the container and renders all items using the renderer function.
     */
    renderItems() {
        this.clear();
        this.items.forEach((item) => this.renderer(item));
    }
}

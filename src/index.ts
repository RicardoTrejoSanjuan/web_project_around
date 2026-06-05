import { App } from "./app/App.js";

const app = new App();

/**
 * Loads application data and initializes the app once the DOM is ready.
 */
document.addEventListener("DOMContentLoaded", async () => {
  await app.loadData();
  app.init();
});

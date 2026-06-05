# Tripleten web_project_around

**Around The U.S.** is a photo gallery web application built at TripleTen with **HTML**, **CSS**, **TypeScript**, and **Object-Oriented Programming (OOP)**. The project uses **BEM**, **responsive design**, and a modular TypeScript class-based structure for popups, cards, form validation, and user info management.

## [🔗 Live Demo](https://ricardotrejosanjuan.github.io/web_project_around/)

![Around The U.S. Screenshot](./public/images/Screenshot.png)

## Current Features

- **REST API Integration**: Load and save profile data, user avatar, and cards dynamically from a remote server.
- **Card Management**: Create new cards, like/unlike, and delete cards with server-side synchronization.
- **Interactive Modals**:
  - Edit profile information through a form popup.
  - Change profile avatar image via a dedicated input form popup.
  - Delete cards securely with a confirmation popup dialog.
  - Open images in an enlarged popup view with captions.
  - Close modals via the close button, clicking the overlay, or pressing the `Escape` key.
- **Object-Oriented Component Architecture**: Reusable, class-based modules for `Card`, `Section`, `UserInfo`, `Api`, and `Popup` subtypes.
- **Form Validation**: Real-time validation with the `FormValidator` class, disabling submit buttons when inputs are invalid and clearing errors when forms are reopened.

## Technologies

- HTML5
- CSS3
- TypeScript
- Object-Oriented Programming (OOP)
- BEM
- Responsive Design

## Project Structure

```text
├── public
│   ├── blocks
│   │   ├── card.css
│   │   ├── cards.css
│   │   ├── content.css
│   │   ├── footer.css
│   │   ├── header.css
│   │   ├── page.css
│   │   ├── popup.css
│   │   └── profile.css
│   ├── images
│   │   ├── ... (image assets)
│   ├── pages
│   │   └── index.css
│   ├── vendor
│   │   ├── fonts.css
│   │   └── normalize.css
│   ├── index.html
│   └── index.js
├── src
│   ├── app
│   │   ├── App.ts
│   │   ├── createCardFactory.ts
│   │   ├── setupEventListeners.ts
│   │   └── setupValidation.ts
│   ├── components
│   │   ├── popups
│   │   │   ├── Popup.ts
│   │   │   ├── PopupWithForm.ts
│   │   │   └── PopupWithImage.ts
│   │   ├── Card.ts
│   │   ├── FormValidator.ts
│   │   ├── index.ts
│   │   ├── Section.ts
│   │   └── UserInfo.ts
│   │   └── Api.ts
│   ├── types
│   │   └── types.ts
│   ├── utils
│   │   ├── constants.ts
│   │   └── selectors.ts
│   └── index.ts
├── tsconfig.json
├── .editorconfig
├── .prettierignore
├── .gitignore
└── README.md
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/ricardotrejosanjuan/web_project_around.git
cd web_project_around
tsc -w
```

## Recent Changes

### Version 3.0.0 - 2026-06-04

- **REST API Integration**: Built a custom `Api` class to handle remote calls for fetching cards and user info, updating details, managing likes, and deleting cards.
- **Profile Avatar Updates**: Added functionality to change the profile image via a dedicated popup modal, persisting the change on the server.
- **Confirmation Modal for Deletion**: Implemented a confirmation dialog (`#delete-popup`) that prompts users before removing a card, ensuring data integrity.
- **Liking & Unliking System**: Synchronized user likes with the server using `PUT` and `DELETE` requests, updating the count/UI state dynamically.
- **Clean Architecture Refactoring**: Reorganized files into distinct modular domains (`src/app/`, `src/components/popups/`, `src/services/`) and streamlined `src/index.ts` to coordinate loading and initialization through the new `App` class.

### Version 2.0.0 - 2026-06-01

- Refactored the entire project to **TypeScript** and **Object-Oriented Programming (OOP)**.
- Implemented class-based design pattern:
  - `Card`: Renders cards and manages event listeners (likes, deletes, card clicks).
  - `Section`: Manages rendering collections of elements into the DOM.
  - `Popup`: Base class for opening and closing modal windows.
  - `PopupWithImage`: Subclass of `Popup` that populates image and caption data.
  - `PopupWithForm`: Subclass of `Popup` that handles form inputs, validation integration, and submits.
  - `UserInfo`: Manages rendering and editing the user's profile info.
  - `FormValidator`: Reusable form validation logic.
- Integrated strict type definitions (`src/types/types.ts`) for data entities and form configurations.
- Set up a build workflow using a custom `tsconfig.json` to compile files from `src/` to `public/`.

## Future Improvements

- [ ] User authentication.
- [ ] Edit card details after creation.
- [ ] Unit testing with Jest.
- [ ] End-to-end testing with Playwright.
- [ ] Webpack/Vite migration.

## Versions

| Version | Date       | Description                                               |
| ------- | ---------- | --------------------------------------------------------- |
| 1.0.0   | 2026-04-28 | Initial version                                           |
| 1.0.2   | 2026-04-28 | Added JavaScript and profile popup functionality          |
| 1.0.3   | 2026-04-30 | Added initial cards, image popup, like and delete actions |
| 1.0.4   | 2026-05-21 | Modularized JavaScript and added form validation          |
| 2.0.0   | 2026-06-01 | Migrated project to TypeScript and OOP architecture       |
| 3.0.0   | 2026-06-04 | Integrated REST API, avatar edits, confirmation popups    |

## Author

Ricardo Trejo

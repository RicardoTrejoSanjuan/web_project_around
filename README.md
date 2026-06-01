# Tripleten web_project_around

**Around The U.S.** is a photo gallery web application built at TripleTen with **HTML**, **CSS**, **TypeScript**, and **Object-Oriented Programming (OOP)**. The project uses **BEM**, **responsive design**, and a modular TypeScript class-based structure for popups, cards, form validation, and user info management.

## Live Demo

<https://ricardotrejosanjuan.github.io/web_project_around_es/>

![Around The U.S. Screenshot](./images/Screenshot.png)

## Current Features

- Edit profile information through a form popup.
- Create new cards through a form popup.
- Dynamically render cards using a class-based `Section` renderer.
- Like and delete cards.
- Open images in an enlarged popup view using a specialized image popup class.
- Close modals with the close button, overlay click, and `Escape` key.
- Real-time form validation through a reusable `FormValidator` class.
- Disabled submit buttons when forms are invalid.
- Clear validation errors when reopening forms.

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
│   ├── components
│   │   ├── Card.ts
│   │   ├── FormValidator.ts
│   │   ├── Popup.ts
│   │   ├── PopupWithForm.ts
│   │   ├── PopupWithImage.ts
│   │   ├── Section.ts
│   │   └── UserInfo.ts
│   ├── types
│   │   └── types.ts
│   ├── utils
│   │   ├── constants.ts
│   │   └── utils.ts
│   └── index.ts
├── tsconfig.json
├── .editorconfig
├── .prettierignore
├── .gitignore
└── README.md
```

## Recent Changes

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

## Versions

| Version | Date       | Description                                               |
| ------- | ---------- | --------------------------------------------------------- |
| 1.0.0   | 2026-04-28 | Initial version                                           |
| 1.0.2   | 2026-04-28 | Added JavaScript and profile popup functionality          |
| 1.0.3   | 2026-04-30 | Added initial cards, image popup, like and delete actions |
| 1.0.4   | 2026-05-21 | Modularized JavaScript and added form validation          |
| 2.0.0   | 2026-06-01 | Migrated project to TypeScript and OOP architecture       |

## Author

Ricardo Trejo


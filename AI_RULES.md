# AI Rules for Physics Pro

This document outlines the core technologies and libraries used in the Physics Pro application, along with guidelines for their usage.

## Tech Stack Overview

*   **Frontend**: Static HTML pages.
*   **Scripting**: Vanilla JavaScript for dynamic content and interactivity.
*   **Styling**: Tailwind CSS (via CDN) for utility-first styling, with custom CSS variables for theming (light/dark mode).
*   **UI Components**: Custom-built components using standard HTML elements and Tailwind CSS.
*   **Icons**: Inline SVG icons.
*   **State Management**: `localStorage` for client-side persistence (e.g., theme, past paper completion, timer).
*   **Routing**: Basic client-side navigation using `window.location.href`.
*   **Backend**: Express.js server for serving static HTML, CSS, and JavaScript files.
*   **Data Storage**: Local JSON files (`assets/videos-data.json`) for content.

## Library Usage Rules

To maintain consistency and leverage the existing architecture, please adhere to the following guidelines when making changes or adding new features:

*   **UI Components**: Create new components directly in HTML files using standard HTML elements and style them with Tailwind CSS. Avoid introducing external UI component libraries like `shadcn/ui` or React components.
*   **Styling**: Use Tailwind CSS classes for all styling. Custom CSS should be minimal and only for unique effects not achievable with Tailwind. Ensure designs are responsive.
*   **Scripting/Interactivity**: Use Vanilla JavaScript for all client-side logic, DOM manipulation, and event handling.
*   **Icons**: Use inline SVG for all icons.
*   **State Management**: For client-side persistence (e.g., user preferences, completion status), use `localStorage`.
*   **Routing**: Use standard `<a>` tags and `window.location.href` for navigation between HTML pages.
*   **File Structure**:
    *   HTML pages: Reside in the root directory (e.g., `index.html`, `demo.html`).
    *   JavaScript files: Place in `assets/js/`.
    *   CSS files: Place in `assets/css/`.
    *   Component fragments (like header/footer): Place in `components/`.
    *   Data files (e.g., JSON): Place in `assets/`.
*   **Backend**: For any server-side logic, use `Express.js` solely for serving static files. No database or API endpoints are currently implemented beyond serving files.
*   **New Features**: Implement new features using static HTML, Tailwind CSS, and Vanilla JavaScript. Avoid introducing React or other frontend frameworks unless explicitly requested for a major architectural shift.
*   **No Partial Implementations**: All code changes must be fully functional and complete. Avoid placeholders or `TODO` comments for features.
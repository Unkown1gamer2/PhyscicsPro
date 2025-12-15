# Physics A-Level Revision Platform

## Overview

This is a premium Physics A-Level revision platform built with a clean static HTML architecture. The application provides an Apple-style, minimalist user interface featuring interactive learning experiences including Multi Learn adaptive lessons, video tutorials, past papers, and exam questions. The platform supports both light and dark themes with frosted glass design elements and smooth animations throughout.

The application follows a professional static website structure:
- **Homepage (index.html)**: Main platform experience with all features and content
- **Login Page (login.html)**: Landing/promotional page targeting 17-18 year old students 
- **Demo Page (demo.html)**: Interactive demonstration of the Multi Learn feature
- **Past Papers (past-papers.html)**: Complete past papers repository with mark schemes
- **Coming Soon Pages**: Placeholder pages for future features (multi-learn, videos, exam-questions, quick-learn, question-by-topic)

The platform is designed to help A-Level Physics students master complex concepts through multiple learning modalities: interactive 3D demonstrations, adaptive multiple-choice questions with instant feedback, comprehensive video tutorials, and authentic past examination papers with marking schemes.

## Tech Stack

*   **Frontend**: Static HTML pages.
*   **Scripting**: Vanilla JavaScript for dynamic content and interactivity.
*   **Styling**: Tailwind CSS (via CDN) for utility-first styling, with custom CSS variables for theming (light/dark mode).
*   **UI Components**: Custom-built components using standard HTML elements and Tailwind CSS.
*   **Icons**: Inline SVG icons.
*   **State Management**: `localStorage` for client-side persistence (e.g., theme, past paper completion, timer).
*   **Routing**: Basic client-side navigation using `window.location.href`.
*   **Backend**: Express.js server for serving static HTML, CSS, and JavaScript files.
*   **Data Storage**: Local JSON files (`assets/videos-data.json`) for content.

## How to Run

1.  **Install dependencies**: `npm install`
2.  **Start the server**: `npm start`
3.  Open your browser to `http://localhost:5000` (or the port specified in your environment).
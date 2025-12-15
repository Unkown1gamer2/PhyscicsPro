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

## Recent Changes

**August 20, 2025 - Major Architecture Restructure**
- Converted from React SPA to static HTML format per user requirements
- Created professional folder structure: /assets/css, /assets/js, /assets/images, /components
- Implemented reusable header and footer components
- Added scroll-to-top functionality across all pages
- Made navigation logo clickable for home navigation/reload
- Created fully functional Past Papers section with real PDF links
- Added coming soon placeholder pages for future features
- Maintained Apple-style glass morphism design and existing functionality

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static HTML, Vanilla JavaScript, and Tailwind CSS**: The client is built using static HTML pages for structure, Vanilla JavaScript for dynamic content and interactivity, and Tailwind CSS (via CDN) for styling. The application uses `localStorage` for client-side state management and `window.location.href` for basic routing between HTML pages.

**Component Architecture**: The UI follows a modular component structure with custom-built components using standard HTML elements and styled with Tailwind CSS. The design system implements a consistent Apple-style aesthetic with frosted glass effects, rounded corners, and subtle animations.

### Backend Architecture

**Express.js Static Server**: The backend is built with Express.js, primarily serving static HTML, CSS, and JavaScript files. There are no database or API endpoints implemented beyond serving these static assets.

### Data Storage Solutions

**Local JSON Files**: Content data, such as video information, is stored in local JSON files (e.g., `assets/videos-data.json`). Client-side persistence for user preferences (like theme or past paper completion status) is handled using `localStorage`.

### Authentication and Authorization

**No Authentication/Authorization**: The current architecture does not include any authentication or authorization mechanisms. All content is publicly accessible.

### External Dependencies

**Styling**: Tailwind CSS (via CDN) for utility-first styling.
**Icons**: Inline SVG icons.
**Other**: No external UI component libraries or frontend frameworks (like React) are used.

The architecture is designed for simplicity and ease of deployment as a static site, with all dynamic functionality handled client-side using Vanilla JavaScript.
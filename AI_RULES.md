# AI Rules for Physics Pro

This document outlines the core technologies and libraries used in the Physics Pro application, along with guidelines for their usage.

## Tech Stack Overview

*   **Frontend Framework**: React 18 with TypeScript.
*   **Routing**: Wouter for client-side routing.
*   **State Management**: React Query (TanStack Query) for server state, React hooks for local component state.
*   **UI Components**: shadcn/ui (built on Radix UI primitives) for accessible and styled components.
*   **Styling**: Tailwind CSS for utility-first styling, with custom CSS variables for theming (light/dark mode).
*   **Build Tool**: Vite for development and optimized production builds.
*   **Backend**: Express.js server for RESTful APIs.
*   **Database**: PostgreSQL with Drizzle ORM for type-safe database operations.
*   **Authentication**: Session-based authentication.
*   **3D Visualizations**: Three.js types are included for future 3D features.

## Library Usage Rules

To maintain consistency and leverage the existing architecture, please adhere to the following guidelines when making changes or adding new features:

*   **UI Components**: Always use `shadcn/ui` components for building the user interface. If a specific component is not available in `shadcn/ui`, create a new, small, focused component in `src/components/` and style it with Tailwind CSS, following the existing glass morphism design. Do not modify existing `shadcn/ui` component files directly.
*   **Styling**: Use Tailwind CSS classes for all styling. Custom CSS should be minimal and only for unique effects not achievable with Tailwind. Ensure designs are responsive.
*   **Routing**: Use `wouter` for all client-side routing. Define new routes in `src/App.tsx`.
*   **State Management**:
    *   For data fetched from the server or data that needs to be cached and synchronized across the app, use `React Query (TanStack Query)`.
    *   For local component state, use standard React hooks (`useState`, `useReducer`, etc.).
*   **Icons**: Use `lucide-react` for all icons.
*   **Forms**: Use `React Hook Form` with `Zod` for form validation.
*   **Toasts**: Use the existing toast notification system (likely `react-hot-toast` or a `shadcn/ui` toast implementation) for user feedback.
*   **File Structure**:
    *   React components should be placed in `src/components/`.
    *   Pages should be placed in `src/pages/`.
    *   Utility functions should be placed in `src/lib/` or `src/utils/`.
    *   All source code should reside within the `src` folder.
*   **Backend**: For any server-side logic or API endpoints, use `Express.js`. Database interactions should be handled with `Drizzle ORM` and `PostgreSQL`.
*   **New Components**: Always create new files for new components or hooks, even if they are small. Avoid adding new components to existing files.
*   **No Partial Implementations**: All code changes must be fully functional and complete. Avoid placeholders or `TODO` comments for features.
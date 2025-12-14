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

**React + TypeScript SPA**: The client is built as a Single Page Application using React 18 with TypeScript for type safety. The application uses Wouter for lightweight client-side routing and Vite as the build tool for fast development and optimized production builds.

**Component Architecture**: The UI follows a modular component structure with shadcn/ui providing the foundational design system. Components are organized into reusable UI primitives (buttons, cards, forms) and feature-specific components (Hero, Navigation, MultiLearnSection). The design system implements a consistent Apple-style aesthetic with frosted glass effects, rounded corners, and subtle animations.

**State Management**: The application uses React Query (TanStack Query) for server state management, providing caching, background updates, and optimistic updates. Local component state is managed with React hooks, and theme state is persisted to localStorage.

**Styling System**: Tailwind CSS provides utility-first styling with custom CSS variables for theming. The design system supports light/dark mode switching with smooth transitions. Custom glass morphism effects are implemented using backdrop-blur and transparency layers.

### Backend Architecture

**Express.js Server**: The backend is built with Express.js providing RESTful API endpoints. The server handles authentication, data validation, and business logic processing. Error handling middleware provides consistent error responses across the application.

**TypeScript Integration**: Full TypeScript support across the backend ensures type safety between client and server. Shared types and schemas are defined in a common directory for consistency.

**Session Management**: User sessions are managed with express-session, configured for secure cookie handling and persistent storage.

### Data Storage Solutions

**PostgreSQL with Drizzle ORM**: The application uses PostgreSQL as the primary database with Drizzle ORM providing type-safe database operations. Drizzle's schema-first approach ensures database schema and TypeScript types remain synchronized.

**Schema Design**: The current schema includes user management with plans for expanding to include course content, user progress tracking, and subscription management. Database migrations are managed through Drizzle Kit.

**Connection Management**: Database connections are handled through environment variables with proper connection pooling for production environments.

### Authentication and Authorization

**Session-based Authentication**: The application implements traditional session-based authentication stored server-side. User credentials are securely hashed and stored in the database.

**Route Protection**: Protected routes are implemented at both the server and client levels, ensuring unauthorized users cannot access premium content.

### External Dependencies

**UI Component Library**: Radix UI primitives provide accessible, unstyled components that are customized with the design system. This ensures accessibility compliance while maintaining design flexibility.

**Development Tools**: 
- Vite for fast development builds and hot module replacement
- ESBuild for production bundling
- PostCSS with Autoprefixer for CSS processing
- TypeScript compiler for type checking

**Third-party Integrations**: 
- Three.js types are included for future 3D visualization features
- Neon Database serverless driver for scalable database connections
- React Hook Form with Zod for form validation and type safety

**Payment Processing**: Placeholder implementation exists for future payment provider integration to handle subscription management.

The architecture is designed for scalability with clear separation of concerns, making it easy to add new features like real-time collaboration, advanced analytics, or additional content types.
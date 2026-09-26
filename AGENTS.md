# AGENTS.md

## Project Overview

This project is a React + Vite implementation of an Airbnb-style vacation rental listing based on the provided reference.

The main goal is to achieve high visual fidelity and behavioral parity with the reference while keeping the implementation clean and maintainable.

The implemented application focuses on the frontend experience, including:

- Listing Page
- Photo Tour
- Image Lightbox
- Navigation and interactions
- Keyboard accessibility
- Visual details such as spacing, typography, icons, images, borders, and transitions

## Technology Stack

- React
- Vite
- JavaScript
- CSS
- Lucide React

## Project Structure

- `src/` — application source code
- `src/components/` — reusable UI components
- `src/data/` — property/listing data
- `public/` — static assets
- `docs/` — project documentation and AI-assisted development prompts
- `architecture/` — production-scale architecture diagram
- `AGENTS.md` — coding-agent instructions
- `CLAUDE.md` — Claude-specific project guidance
- `.claude/` — Claude Code configuration

## Development Guidelines

### Component Design

- Prefer small, focused, reusable React components.
- Keep components responsible for a single UI concern where practical.
- Avoid unnecessary duplication.
- Keep property data separate from presentation logic.

### Visual Fidelity

When modifying the UI, preserve the reference as closely as possible.

Pay attention to:

- Layout
- Spacing
- Typography
- Image dimensions and aspect ratios
- Borders and border radius
- Shadows
- Icons
- Button sizes
- Hover states
- Overlays
- Transitions and animations

Do not introduce UI elements that are not required by the reference.

### Behavior

- Preserve existing interactions when making changes.
- Keep Listing Page, Photo Tour, and Lightbox flows functional.
- Maintain correct image navigation.
- Support keyboard interaction for interactive elements where appropriate.
- Avoid breaking existing navigation.

### Accessibility

- Prefer semantic HTML.
- Use buttons for actions.
- Provide meaningful image `alt` text.
- Ensure interactive elements are keyboard accessible.
- Maintain visible and logical focus behavior for overlays and dialogs.

### Code Quality

- Use clear and readable JavaScript.
- Follow the existing project structure.
- Reuse existing components where possible.
- Avoid unnecessary dependencies.
- Do not introduce TypeScript unless explicitly required.
- Do not add backend infrastructure unless explicitly requested.

## AI-Assisted Development Workflow

When using an AI coding agent:

1. Inspect the existing implementation before making changes.
2. Identify the relevant files.
3. Make the smallest focused change necessary.
4. Reuse existing components and patterns.
5. Run the application or build after significant changes.
6. Verify the affected UI and behavior.
7. Check for console errors.
8. Review the final changes for unnecessary modifications.

## Assignment Constraints

The submitted application is primarily a frontend implementation.

The production architecture diagram describes a proposed architecture for scaling the concept into a full vacation-rental marketplace. It should not be interpreted as infrastructure already implemented in this frontend clone.

Do not claim functionality that is not present in the codebase.

## Before Final Submission

Verify that:

- The application builds successfully.
- Listing Page works.
- Photo Tour works.
- Lightbox works.
- Keyboard interactions work where applicable.
- No unnecessary files or dependencies were added.
- `node_modules/` is excluded from the submission ZIP.
- AI configuration and documentation files are included.

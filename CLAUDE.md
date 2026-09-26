# CLAUDE.md

## Project Context

This is a React + Vite Airbnb-style frontend clone created for a software engineering take-home assignment.

The main evaluation criteria are:

- Visual fidelity to the reference
- Behavioral parity
- Accessibility
- Clean project structure
- Appropriate use of AI-assisted development
- Production architecture thinking

## Before Editing

Before making changes:

1. Inspect the relevant files.
2. Understand existing component relationships.
3. Reuse existing components and data where possible.
4. Avoid broad rewrites unless necessary.

## Implementation Principles

### UI Fidelity

Prioritize matching the reference implementation in:

- Positioning
- Spacing
- Typography
- Image dimensions
- Borders and shadows
- Icons
- Hover states
- Modals and overlays
- Transitions and animations

### React

- Use functional components.
- Keep components focused.
- Use React state only where interaction requires it.
- Avoid unnecessary global state.

### JavaScript

- Use the existing JavaScript setup.
- Keep code readable and maintainable.
- Avoid adding dependencies for functionality that can be implemented simply with existing tools.

### Accessibility

- Use semantic HTML where practical.
- Provide meaningful `alt` text for images.
- Ensure interactive elements are keyboard accessible.
- Use appropriate button elements for actions.

### Performance

- Avoid unnecessary rendering.
- Reuse assets and components.
- Keep dependencies minimal.
- Do not optimize prematurely.

## Change Workflow

For each requested change:

1. Inspect.
2. Plan the smallest change.
3. Implement.
4. Run/build the application.
5. Verify the visual and behavioral result.
6. Fix regressions.
7. Summarize the changes.

## Do Not

- Do not add a backend unless explicitly requested.
- Do not replace the current stack without a clear requirement.
- Do not remove working functionality to simplify the code.
- Do not introduce unnecessary libraries.
- Do not fabricate functionality that is not implemented.

## Assignment Context

The production architecture diagram is a proposed architecture for scaling the concept into a full vacation-rental marketplace. It should not be interpreted as infrastructure already implemented in this frontend clone.

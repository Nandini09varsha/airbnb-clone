# AI-Assisted Development Prompt Sequence

This document records the main prompts used during AI-assisted development of the Airbnb Clone.

The prompts were used iteratively to inspect the reference, implement the required views, refine interactions, and perform visual QA.

## Prompt 1 — Project Analysis and Implementation Plan

> Analyze the provided Airbnb reference carefully and identify the page structure, major UI sections, interactions, visual hierarchy, and required states. Plan a React + Vite implementation that prioritizes visual fidelity and behavioral parity. Keep the architecture clean and component-based, and avoid unnecessary backend functionality because this assignment focuses on reproducing the provided frontend experience.

## Prompt 2 — Listing Page

> Implement the main Airbnb listing page based on the provided reference. Match the reference as closely as possible in layout, spacing, typography, image proportions, buttons, icons, property information, and responsive behavior. Use reusable React components and keep property data separate from presentation logic. Do not add unnecessary features that are not present in the reference.

## Prompt 3 — Photo Tour

> Implement the Photo Tour view from the reference. Reproduce the image grid, layout, navigation, header/actions, spacing, and overall visual hierarchy. Reuse the existing property image data and components where appropriate. Make sure navigation between the listing page and photo tour behaves correctly.

## Prompt 4 — Lightbox

> Implement the image lightbox behavior shown in the reference. Clicking an image should open the appropriate full-screen overlay and allow navigation between property images. Add close and previous/next controls, preserve the correct image ordering, and support keyboard interactions where appropriate. Match the reference overlay, spacing, controls, and transitions as closely as possible.

## Prompt 5 — Accessibility and Interaction Refinement

> Review the current implementation for accessibility and interaction issues. Check keyboard accessibility, semantic elements, button behavior, image alt text, focus behavior, modal/lightbox interactions, and navigation. Fix issues without changing the visual design or introducing unnecessary dependencies.

## Prompt 6 — Visual Fidelity and Final QA

> Perform a final visual and behavioral review against the provided Airbnb reference. Check layout, spacing, typography, image sizing, borders, shadows, icons, hover states, transitions, navigation, Photo Tour, and Lightbox behavior. Identify the highest-impact differences and make focused corrections. Do not rewrite working components unnecessarily. Verify that the application builds successfully and that no existing functionality is broken.

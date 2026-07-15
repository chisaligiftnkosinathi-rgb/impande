# AXIONYX Design System Specification

## Philosophy
The AXIONYX design system is built to communicate computational precision, scientific evidence, and institutional trust. The visual language is calm, deliberate, and data-centric. It is an operating environment for a research observatory, not a marketing website.

## 1. Color Palette (The Eight Elements)
*Source of Truth: `src/styles/tokens.css`*

### Base Backgrounds
- `--ax-background`: `#0b1f3a` (Deep Observatory Blue)
- `--ax-surface`: `#112a4f` (Elevated Panel)

### Typography
- `--ax-text`: `#e5e7eb` (Primary Reading Text)
- `--ax-muted`: `#9ca3af` (Secondary Information)

### Accents & Interactions
- `--ax-primary`: `#3b82f6` (Interactive Blue)
- `--ax-secondary`: `#10b981` (Verification Green)
- `--ax-border`: `#1e3a8a` (Structural Boundaries)

### Status Indicators
- `--ax-success`: `#059669` (Verified, Certified)
- `--ax-warning`: `#d97706` (Pending, Under Review)
- `--ax-error`: `#dc2626` (Deprecated, Rejected)
- `--ax-info`: `#2563eb` (Informational)

### Glassmorphism
- `--ax-glass`: `rgba(17, 42, 79, 0.75)`
- `--ax-glass-border`: `rgba(255, 255, 255, 0.1)`

## 2. Typography Scale
- **Font Family**: `Inter` (sans-serif, optimized for data density)
- **Scale**:
  - H1: `2.5rem` (40px) - Page Titles
  - H2: `1.875rem` (30px) - Section Headers
  - H3: `1.5rem` (24px) - Card Titles
  - Body: `1rem` (16px) - General Text
  - Small: `0.875rem` (14px) - Metadata, Badges

## 3. Structural Properties
- **Border Radius**: `--ax-radius` `0.5rem` (8px) for cards and inputs.
- **Shadows**:
  - `--ax-shadow-soft`: Subdued shadow for inline elements.
  - `--ax-shadow-elevated`: High-contrast shadow for modal and hover states.

## 4. Component Architecture
Components are split into two strictly separated directories:

### `src/components/ui/`
Generic, stateless, reusable primitives based on Radix UI.
- `button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`, etc.
- Must only consume `var(--ax-*)` tokens.

### `src/components/observatory/`
AXIONYX-specific business logic components.
- `ResearchCard.tsx`, `KnowledgeObjectCard.tsx`, `GraphPreview.tsx`.
- Consumes the `ui/` primitives and connects them to AXIONYX data models.

## 5. Motion Principles
- **Restraint**: Animations must not distract from the data.
- **Purpose**: Use motion exclusively for transitions, loading states, and tactile feedback (hover elevations).
- **Tooling**: Powered by Framer Motion.

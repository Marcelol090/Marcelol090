# Doran OP — Design System Master

## Product intent

Doran OP is a calm, evidence-led career exploration product. The interface must reduce decision pressure, present uncertainty honestly, and make the path from self-perception to real-world experimentation visible.

This document follows the Master + page override pattern recommended by UI/UX Pro Max.

## Design direction

- **Style:** editorial dark interface + restrained scientific cartography.
- **Keywords:** calm, trustworthy, reflective, precise, grounded, tactile.
- **Avoid:** neon, glossy gradients, excessive glass blur, AI-purple, giant dashboard density, ornamental animation.
- **Visual metaphor:** a field map where interests, context, values and experiments become connected routes.

## Color tokens

| Token | Value | Use |
|---|---:|---|
| Background | `#08111B` | Main page field |
| Surface | `#0B1621` | Section layers |
| Card | `#0E1A27` | Primary content containers |
| Secondary | `#142333` | Controls and nested cards |
| Border | `#273A4B` | Default structure |
| Border strong | `#3B5265` | Hover and focus structure |
| Foreground | `#E9EFF4` | Primary text |
| Muted foreground | `#9AA8B5` | Supporting text |
| Primary | `#A4BED3` | Main CTA and analytical emphasis |
| Warm | `#C6B99E` | Caution, reflection and human nuance |
| Success | `#91B6A7` | Confirmations and valid evidence |
| Destructive | `#A96767` | Errors only |

Rules:

- No raw colors inside React components unless drawing a data visualization.
- Body text must meet WCAG AA contrast.
- Do not communicate status by color alone. Pair color with icon and text.

## Typography

- **Display:** Newsreader Variable. Used for hero headings, screen titles and large profile codes.
- **Interface/body:** Manrope Variable. Used for controls, labels, descriptions and data.
- Body minimum: 16px on mobile.
- Reading width: 60–75 characters on desktop.
- Use tabular numerals for scores and probabilities.

## Layout

- Mobile-first.
- Main marketing container: `1240px`.
- Assessment container: `1120px`.
- Spacing follows an 8px rhythm with 4px subdivisions.
- Primary content should not use more than two columns before 1024px.
- Touch targets: minimum 44×44px.

## Components

- Components follow shadcn/ui's copy-and-own model.
- Borders carry most of the hierarchy. Shadows remain broad and low contrast.
- Radius scale: 12px controls, 16px nested panels, 24px primary cards.
- Every screen has one dominant action.
- Loading longer than 300ms uses skeleton feedback.

## Motion

- Motion tier: restrained, 4/10.
- Micro-interactions: 160–240ms.
- Screen transitions: 240ms.
- Hero float: one or two elements only, 5–6s cycle.
- Animate opacity and transforms, not layout dimensions.
- Respect `prefers-reduced-motion`.

## Accessibility checklist

- Visible focus ring on all interactive elements.
- Skip-to-content link.
- Logical heading hierarchy.
- Labels always visible for form controls.
- Keyboard navigation matches visual order.
- Icon-only buttons include `aria-label`.
- Charts include textual accessible labels.
- No hover-only information.

## Image system

All project illustrations are locally hosted SVGs:

- `doran-mark.svg`: brand mark built from doorway + route.
- `pathways-orbit.svg`: RIASEC map for the hero.
- `decision-landscape.svg`: process landscape connecting interests, context and experiments.
- `topography.svg`: low-contrast environmental texture.

Images use navy, slate, powder blue and stone. They must never glow or mimic generic AI neon artwork.

## Anti-patterns

- Oversized heading that consumes the full viewport without supporting content.
- Full-card borders with no internal hierarchy.
- Cyan-to-green neon CTA gradients.
- Tiny explanatory text below 12px.
- AI recommendations presented before deterministic results.
- Percentages without the phrase “aderência relativa”.
- Infinite decorative animation.

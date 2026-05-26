---
name: Lumina Habitat
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 26px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is anchored in a **Modern Minimalist** aesthetic with a heavy emphasis on **Spatial UI** principles. It aims to evoke a sense of clarity, premium craftsmanship, and effortless discovery for high-end residential listings.

The visual language borrows the precision of developer-focused tools (Linear, Vercel) and blends it with the warmth and hospitality of lifestyle platforms (Airbnb). The result is a "High-Definition" interface that feels both high-tech and deeply human. Key characteristics include:

- **Expansive Whitespace:** Using negative space as a luxury element to reduce cognitive load.
- **Precision Typography:** Sharp, legible type scales that prioritize hierarchy and information density without clutter.
- **Layered Intelligence:** Using depth and subtle translucency to suggest physical layers, helping users understand the relationship between maps, lists, and detail views.
- **Mobile-First Ergonomics:** Large, high-precision touch targets designed for one-handed navigation.

## Colors

The palette is professional and vibrant, utilizing a core of high-contrast neutrals punctuated by a trustworthy "Signal Blue."

- **Primary & Secondary:** The interaction between Blue and Dark Slate creates a reliable, institutional feel. Use Blue for primary actions and Slate for structural elements like headers and navigation bars.
- **The Accent (Teal):** Reserved for "Value Add" highlights—such as "Verified Listing" badges or sustainability features—to differentiate them from standard UI actions.
- **Semantic Colors:** Success, Warning, and Error colors follow industry standards but are slightly desaturated to maintain the premium feel.
- **Surfacing:** In Light mode, the background uses a cool slate tint (#F8FAFC) to allow white surfaces (#FFFFFF) to "pop" via elevation. In Dark mode, the depth is achieved through varying degrees of midnight navy.

## Typography

This design system uses **Geist** for its technical precision and modern, open letterforms. 

The type scale is designed for high readability in data-rich environments. Headlines use tighter letter-spacing and heavier weights to create a strong visual anchor. The `label-md` role is specifically crafted for metadata (e.g., square footage, price per month) using a slightly heavier weight and uppercase styling to distinguish it from narrative body text. For mobile, headline sizes are scaled down to ensure that listing titles do not wrap excessively, preserving the vertical rhythm of the scroll.

## Layout & Spacing

The system follows a strict **8px grid**, ensuring all components align to a predictable rhythmic scale.

- **Fluid-Fixed Hybrid:** On mobile, the layout is fully fluid with `16px` outer margins. On desktop, content is contained within a `1280px` max-width centered wrapper.
- **Vertical Rhythm:** Use `lg` (24px) or `xl` (32px) spacing between distinct sections (e.g., between the map and the listing results). Use `sm` (12px) for internal component spacing (e.g., between an icon and its text label).
- **Touch Targets:** Any interactive element must maintain a minimum hit area of `44px x 44px` regardless of its visual size, particularly critical for the "Favorite" heart icon and filter chips.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering**.

- **Level 0 (Base):** The `background_light` color. No shadow.
- **Level 1 (Cards/Sheet):** Surface color with a very soft, diffused shadow: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`.
- **Level 2 (Dropdowns/Modals):** Surface color with a more pronounced elevation: `0 10px 15px -3px rgb(0 0 0 / 0.1)`.
- **Glassmorphism:** Use `backdrop-filter: blur(12px)` with a semi-transparent surface (e.g., `rgba(255, 255, 255, 0.8)`) for sticky navigation bars and floating action buttons. This keeps the user grounded in their spatial context (like a map underneath the UI).
- **Outlines:** Use a `1px` border of `Slate-200` on cards to define boundaries in low-contrast scenarios.

## Shapes

The design system employs a **Rounded** corner strategy (`0.5rem` or `8px` base) to balance professionalism with approachable warmth.

- **Small Components:** Checkboxes and small badges use `0.25rem`.
- **Standard Components:** Buttons, Input fields, and List Items use `0.5rem`.
- **Large Components:** Property cards and Modals use `rounded-lg` (`1rem`) or `rounded-xl` (`1.5rem`) to soften the overall appearance of the page.
- **Pills:** Search bars and Filter chips should use a fully rounded "pill" shape (e.g., `999px`) to emphasize their distinct interactive nature.

## Components

### Buttons
- **Primary:** Solid `Primary Blue` with white text. High-radius corners. Subtle scale-down effect on tap (0.98).
- **Secondary:** Transparent background with a `Slate-200` border or a light ghost-blue tint.
- **Floating Action Button (FAB):** High-elevation, pill-shaped, used for "View Map" or "Filter" on mobile.

### Cards
- Property cards feature a `16:9` aspect ratio image container. 
- Price and "Favorite" button are layered over the image using glassmorphic overlays in the corners.
- Content below the image uses `body-md` for titles and `label-md` for metadata.

### Input Fields
- Understated design: `1px` border in `Slate-200`.
- Focus state: Border changes to `Primary Blue` with a `2px` outer glow (Primary color at 10% opacity).
- Large `16px` font size to prevent iOS "zoom-on-focus."

### Chips & Filters
- Use a `pill` shape. 
- Active state: Background `Secondary Slate`, text `White`.
- Inactive state: Background `Slate-100`, text `Secondary Slate`.

### Lists
- Use horizontal dividers (1px Slate-100) but favor generous whitespace over lines where possible.
- Chevron-right icons should be subtle (`Slate-400`) to indicate drill-down actions.

### Mobile Bottom Sheet
- For filters and property details, use a "drawer" that slides from the bottom.
- Includes a centered "grabber" handle at the top.
- Background uses the `Level 2` elevation and glassmorphism.
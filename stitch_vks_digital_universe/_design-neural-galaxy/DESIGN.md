---
name: Neural Galaxy
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c2c6d9'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8c90a2'
  outline-variant: '#424656'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#0062ff'
  on-primary-container: '#f3f3ff'
  inverse-primary: '#0053da'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#007a8f'
  on-tertiary-container: '#e0f8ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is engineered to evoke the atmosphere of a high-end, clandestine AI laboratory orbiting a digital nebula. It targets a technical audience—recruiters, engineers, and researchers—who value both rigorous engineering and avant-garde creative expression. 

The aesthetic is a hybrid of **Glassmorphism** and **Futuristic Minimalism**, utilizing high-depth layering and neon atmospheric lighting. The interface should feel less like a static website and more like a tactile holographic terminal. Use vibrant background blurs to simulate light refracting through glass, and maintain a strict "dark mode" foundation to allow accent colors to pop with cinematic intensity.

## Colors
The palette is built on a "Deep Space" foundation of `#0a0a0f`. Accents are used as light sources rather than just fills.

- **Primary (Electric Blue):** Used for core actions and primary brand signals.
- **Secondary (Neon Purple):** Used for creative highlights and secondary interactions.
- **Cyan & Magenta:** Reserved for data visualization, "Active" states, and gradient blends to simulate a neural-network glow.
- **Glass Stroke:** Use `rgba(255, 255, 255, 0.1)` for card borders to create the "frosted edge" effect.
- **Gradients:** Use linear gradients (135deg) transitioning from Primary to Secondary or Cyan to Magenta for buttons and headings.

## Typography
Typography reflects a balance between technical precision and modern elegance. 

- **Headlines:** Use **Sora** for its geometric, tech-forward construction. Apply gradient masks to `display-lg` text for maximum impact.
- **Body:** **Plus Jakarta Sans** provides a soft, approachable contrast to the sharp edges of the technical UI, ensuring long-form readability.
- **Monospace:** Use **JetBrains Mono** exclusively for metadata, skill tags, code snippets, and small labels to reinforce the "B.Tech AI/ML" identity. All mono text should be uppercase with slight tracking (0.05em).

## Layout & Spacing
The layout follows a **Fluid Grid** system within a 1280px max-width container. 

- **Grid:** 12-column layout for desktop, 6-column for tablet, and 2-column for mobile.
- **Rhythm:** Use an 8px base unit. Component internal padding should favor generous whitespace (e.g., 32px or 48px) to allow "glass" surfaces to breathe.
- **Reflow:** On mobile, stack all cards vertically. The floating navigation pill should remain anchored to the bottom of the viewport with a `20px` safe-area margin.

## Elevation & Depth
Depth is the most critical aspect of this design system. It is achieved through **Tonal Layering** and **Backdrop Blurs**.

- **Z-Index 1 (Background):** Near-black `#0a0a0f` with animated SVG neural mesh patterns at 5% opacity.
- **Z-Index 2 (Cards):** Background `rgba(15, 15, 25, 0.7)` with `backdrop-filter: blur(20px)`. Apply a 1px border with a linear gradient (top-left to bottom-right) from white (15% opacity) to transparent.
- **Z-Index 3 (Floating Nav/Modals):** Background `rgba(20, 20, 35, 0.8)` with `backdrop-filter: blur(40px)`.
- **Shadows:** Use large, diffused blue/purple shadows (`0 20px 50px rgba(0, 0, 0, 0.5)`) combined with a subtle outer "glow" using a `box-shadow: 0 0 15px rgba(0, 98, 255, 0.1)`.

## Shapes
Shapes are modern and structured. Use the **Rounded** (0.5rem) setting as the default for all standard UI components to keep the feel balanced. 

- **Cards:** Use `rounded-xl` (1.5rem) to emphasize the containerized "glass" look.
- **Navigation & Chips:** Use `pill` (999px) for the floating navigation bar and skill chips to create a friendly, organic contrast against the rigid grid.
- **Interactive Elements:** Buttons should use `rounded-lg` (1rem).

## Components

- **Floating Navigation:** A pill-shaped bar anchored at the bottom. Use a high backdrop blur and a thin Cyan-to-Magenta border. Active states use a subtle glow.
- **Glass Cards:** Feature a 1px border. On hover, utilize a **Perspective Tilt** transform (rotateX/rotateY) and increase the border opacity to 40%.
- **Buttons:**
  - *Primary:* Gradient background (Primary to Secondary) with white text and a hover effect that expands a soft outer glow.
  - *Ghost:* Transparent background with a gradient border and `label-mono` typography.
- **Skill Chips:** Monospaced text inside a small pill container. Use a subtle `#0062ff` background at 10% opacity with a matching solid border.
- **Input Fields:** Dark background (`#050507`), no fill, 1px bottom border that expands into a full gradient border on focus.
- **Neural Tooltips:** Use Magenta backgrounds for tooltips with JetBrains Mono text to create a high-contrast "system alert" feel.
- **3D Hero Stage:** Reserve the top 60% of the home page for a 3D canvas (Three.js/Spline) featuring a floating "Core" that reacts to scroll position.
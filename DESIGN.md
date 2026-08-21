---
name: Estate E-commerce
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f2'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e2e1'
  on-surface: '#1a1c1b'
  on-surface-variant: '#414846'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#717975'
  outline-variant: '#c1c8c4'
  surface-tint: '#42655b'
  primary: '#12362e'
  on-primary: '#ffffff'
  primary-container: '#2a4d44'
  on-primary-container: '#97bdb1'
  inverse-primary: '#a9cec2'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#303131'
  on-tertiary: '#ffffff'
  tertiary-container: '#464747'
  on-tertiary-container: '#b6b5b5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c4ebde'
  primary-fixed-dim: '#a9cec2'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#2a4d44'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e2e1'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
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
    lineHeight: '1.5'
    letterSpacing: '0'
  label-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is rooted in a **Minimalist / Luxury Modern** aesthetic. It prioritizes the product as the hero, utilizing generous white space and a restrained color palette to evoke a sense of calm, high-end professionality. The visual narrative is intentional and quiet, avoiding loud trends like glassmorphism or heavy shadows in favor of structural clarity and refined proportions. 

The target audience values efficiency, clarity, and a premium shopping experience. The UI should feel reliable and sophisticated, behaving as an unobtrusive gallery for the products it hosts.

## Colors
This design system utilizes a warm, off-white background to provide a softer, more luxurious feel than pure white. 

- **Primary (#2A4D44):** A deep forest green reserved for primary calls to action, active states, and critical brand touchpoints.
- **Neutral High (#1A1A1A):** Used for primary headings and body text to ensure maximum legibility and a grounded feel.
- **Neutral Muted (#666666):** Used for secondary information, meta-data, and placeholder text.
- **Surface (#FFFFFF):** Elevated components and cards sit on pure white to subtly distinguish them from the warm background.
- **Error (#D32F2F):** A classic, authoritative red for validation and critical system alerts.

## Typography
The system uses **Geist** for its technical precision and clean, modern letterforms. The type scale is designed for spaciousness.

- **Display levels** use tighter tracking and heavier weights to create impact for hero sections and product titles.
- **Body text** utilizes a generous line height (1.5 - 1.6) to ensure effortless readability during long-form product descriptions.
- **Labels** are occasionally uppercase with slight letter-spacing to provide a rhythmic contrast to sentence-case headings.

## Layout & Spacing
The design system employs a **Fixed Grid** model for desktop and a **Fluid Grid** for mobile devices. 

- **Desktop:** 12-column grid with a maximum width of 1280px. Gutters are fixed at 24px to maintain a rhythmic vertical scan line.
- **Mobile:** 4-column fluid grid with 16px side margins.
- **Spacing Logic:** All spacing is derived from a 4px baseline. Use `stack-lg` (48px) for separating major sections and `stack-md` (24px) for internal component spacing to maintain the "spacious" brand promise.

## Elevation & Depth
In alignment with the minimalist aesthetic, depth is conveyed through **Tonal Layering** and **Low-contrast Outlines** rather than heavy shadows.

- **Level 0 (Background):** #FDFCFB.
- **Level 1 (Cards/Surfaces):** #FFFFFF with a 1px border of #E5E5E5.
- **Interactive Elevation:** On hover, cards may transition to a subtle "ambient" shadow: `0 4px 20px rgba(0,0,0,0.04)`.
- **Dividers:** Use 1px solid #E5E5E5 for horizontal separation. Avoid using dividers if whitespace alone can create the necessary grouping.

## Shapes
The shape language is architectural and structured. 

- **Radius:** A consistent 4px (`rounded-sm`) is used for buttons, input fields, and cards. This slight softening prevents the UI from feeling "sharp" or "aggressive" while maintaining a professional, geometric rigor. 
- **Icons:** Use linear, 2px stroke icons to match the weight of the typography and borders.

## Components

### Buttons
- **Primary:** Solid #2A4D44 background, white text. No gradient. 4px border radius.
- **Secondary:** Transparent background, 1px border of #1A1A1A, black text.
- **States:** Hover state for primary buttons should be a slight darken (10%); hover for secondary should be a very light gray fill (#F5F5F5).

### Inputs
- **Style:** Subtle 1px bottom-border only or a full 1px border in #E5E5E5 for high-density forms.
- **Focus:** Transition border color to #2A4D44.
- **Labels:** Always visible, placed above the input in `label-sm` styling.

### Cards
- **Product Cards:** No background shadow by default. Image-first with `body-md` text. Text alignment should be left-aligned for a modern, editorial look.
- **Padding:** Minimum 24px internal padding for content cards.

### Feedback & Notifications
- **Inline Validation:** Error messages appear directly below the input field in #D32F2F. 
- **Empty States:** Use muted icons and `body-md` text centered in the container. Avoid decorative illustrations; prefer high-quality photography or iconography.

### Navigation
- **Header:** Sticky, #FFFFFF background with a 1px bottom border. Horizontal links in `label-sm` weight.
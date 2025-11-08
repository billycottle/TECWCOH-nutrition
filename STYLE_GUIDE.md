# Comprehensive Design System Style Guide

## Overview

This design system utilizes a modern, minimalist approach with a warm color palette centered around a cream/beige background. The system employs two primary font families working in harmony: **Aeonik Mono** for headings and UI elements, and **Inter** for body text, creating a sophisticated contrast between monospace and sans-serif typography. The design emphasizes uppercase headings, generous spacing, and a mobile-first responsive approach with breakpoints at 728px, 960px, and 1302px.

**Design Philosophy:**
- Mobile-first responsive design
- Minimalist, warm aesthetic
- Strong typographic hierarchy with uppercase headings
- Accessibility-focused with proper contrast and spacing
- Smooth animations and transitions for enhanced UX

---

## Color Palette

### Primary Colors

**Background Colors:**
- **Primary Background:** `#F4EFEA` - A warm cream/beige serving as the main canvas
- **Scrollbar Track:** `#f1f1f1` - Light gray for scrollbar backgrounds

**Text Colors:**
- **Primary Text:** `#383838` - Dark gray for excellent readability
- **Link Color:** `#383838` - Consistent with text color
- **Link Hover (Accent):** `#2BA5FF` - Bright blue for interactive states

**Scrollbar Colors:**
- **Scrollbar Thumb:** `#888` - Medium gray
- **Scrollbar Thumb Hover:** `#555` - Darker gray on hover

### Color Usage Guidelines

The color system is intentionally minimal, relying on the warm cream background (`#F4EFEA`) to create a soft, inviting interface. Text maintains high contrast with dark gray (`#383838`), ensuring accessibility. The bright blue accent (`#2BA5FF`) is reserved exclusively for interactive hover states on superscript links, creating clear visual feedback without overwhelming the design.

---

## Typography

### Font Families

**Primary Font Stack:**
```css
font-family: 'Aeonik Mono', sans-serif;
```
- Used for: All HTML elements by default, headings, buttons, inputs
- Character: Monospace, modern, technical aesthetic

**Body Text Font:**
```css
font-family: 'Inter', Arial, sans-serif;
```
- Used for: Paragraphs (`<p>`) and labels (`<label>`)
- Character: Clean, highly readable sans-serif

**Fallback Font (External Content):**
```css
font-family: 'Open Sans';
```
- Available in weights: 400 (regular), 700 (bold)
- Used for external or embedded content requiring wider Unicode support

### Heading Hierarchy

#### H1 - Primary Headline
```css
font-style: normal;
font-weight: 400;
text-transform: uppercase;
```

**Mobile (default):**
- Font size: `30px`
- Line height: `140%`

**Tablet (≥728px):**
- Font size: `56px`
- Line height: `120%`

**Desktop (≥960px):**
- Font size: `80px`
- Line height: `120%`

**Usage:** Page titles, hero headlines

---

#### H2 - Section Headers
```css
font-style: normal;
font-weight: 400;
text-transform: uppercase;
```

**Mobile (default):**
- Font size: `24px`
- Line height: `140%`

**Tablet (≥728px):**
- Font size: `32px`
- Line height: `140%`

**Desktop (≥960px):**
- Font size: `40px`
- Line height: `120%`

**Usage:** Major section headings

---

#### H3 - Subsection Headers
```css
font-style: normal;
font-weight: 400;
text-transform: uppercase;
```

**Mobile (default):**
- Font size: `24px`
- Line height: `140%`

**Desktop (≥960px):**
- Font size: `32px`
- Line height: `140%`

**Usage:** Subsection titles within sections

---

#### H4 - Tertiary Headers
```css
font-style: normal;
font-weight: 400;
text-transform: uppercase;
```

**Mobile (default):**
- Font size: `18px`
- Line height: `140%`

**Tablet (≥728px):**
- Font size: `24px`
- Line height: `140%`

**Desktop (≥960px):**
- Font size: `32px`
- Line height: `140%`

**Usage:** Card titles, component headers

---

#### H5 - Minor Headers
```css
font-style: normal;
font-weight: 400;
text-transform: uppercase;
```

**Mobile (default):**
- Font size: `18px`
- Line height: `140%`

**Desktop (≥960px):**
- Font size: `24px`
- Line height: `140%`

**Usage:** Small section headers, sidebar titles

---

#### H6 - Smallest Headers
```css
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 140%;
text-transform: uppercase;
```

**Note:** No responsive scaling for H6

**Usage:** Labels, smallest hierarchical divisions

---

### Body Text

#### Paragraphs
```css
font-family: 'Inter', Arial, sans-serif;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 140%;
letter-spacing: 0.02em;
```

**Characteristics:**
- Light font weight (300) for a refined appearance
- Generous letter spacing (0.02em) for improved readability
- Consistent 140% line height across all paragraph text

---

#### Labels
```css
font-family: 'Inter', Arial, sans-serif;
font-style: normal;
font-weight: 400;
```

**Mobile (default):**
- Font size: `14px`
- Line height: `140%`

**Tablet (≥728px):**
- Font size: `16px`
- Line height: `160%`

**Usage:** Form labels, input descriptions

---

### Typography Patterns

**Key Design Decisions:**

1. **Font Pairing:** Aeonik Mono (headings) + Inter (body) creates visual hierarchy through contrasting typeface styles
2. **Weight Strategy:**
   - Headings use regular weight (400) with uppercase for emphasis
   - Body text uses light weight (300) for elegance
   - Labels use regular weight (400) for clarity
3. **All Headings:** Uppercase transformation applied universally to all heading levels
4. **Consistent Line Heights:** 140% for most elements, 120% for larger headings on desktop
5. **Letter Spacing:** 0.02em applied to paragraphs for enhanced readability

---

## Spacing System

### Global Spacing Rules

**Box Model Reset:**
```css
box-sizing: border-box;
margin: 0;
padding: 0;
```

All HTML elements start with no margin or padding, allowing for precise control over spacing throughout the design.

### Scroll Padding

The system implements scroll padding to account for fixed headers:

**Mobile (default):**
```css
scroll-padding-top: var(--header-mobile);
```

**Desktop (≥1302px):**
```css
scroll-padding-top: var(--header-desktop);
```

**Tablet/Desktop Scroll Margin (≥728px):**
```css
scroll-margin-top: var(--eyebrow-desktop);
```

These CSS custom properties ensure that anchor links and scrolling behaviors account for fixed navigation elements.

### Spacing Conventions

Based on the reset and the overall structure, the design system relies on:

1. **Component-level spacing** rather than global margins
2. **CSS custom properties** for dynamic spacing values
3. **Responsive spacing** that adapts to viewport size
4. **Zero baseline** - all spacing is explicitly defined rather than inherited

---

## Component Styles

### Links

```css
a {
  color: #383838;
  text-underline-offset: 0.22em;
}
```

**Characteristics:**
- Same color as body text for subtle integration
- Underline offset (0.22em) creates breathing room
- No text decoration by default (reset to none, presumably added contextually)

---

### Superscript Links

```css
sup {
  vertical-align: super;
  font-size: smaller;
  font-weight: 600;
  text-decoration: underline;
  margin: 0 2px;
}

sup a:hover {
  color: #2BA5FF;
}
```

**Usage:** Footnote references, citations
**Behavior:** Hover state changes color to bright blue accent

---

### Lists

```css
ol, ul {
  list-style: none;
}
```

All lists have no default styling, allowing for custom bullet/numbering implementations.

---

### Tables

```css
table {
  border-collapse: collapse;
  border-spacing: 0;
}
```

Tables use collapsed borders with no spacing for clean, grid-like layouts.

---

### Toast Notifications (Toastify)

```css
.Toastify__toast {
  margin: 0px;
  padding: 0px;
  border-radius: 0px;
}

.Toastify__toast-body {
  padding: 0px;
}

.Toastify__toast-container {
  width: fit-content;
}
```

**Design Approach:**
- Zero margin and padding for full control
- No border radius (sharp corners consistent with design aesthetic)
- Container sized to content (fit-content)

---

### Scrollbar Customization

```css
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

**Characteristics:**
- Ultra-thin scrollbars (5px) for minimal visual weight
- Light gray track blends with background
- Medium gray thumb with darker hover state
- Only affects WebKit browsers (Chrome, Safari, Edge)

---

## Shadows & Elevation

**Critical Finding:** This design system **does not implement box shadows or elevation layers**. The aesthetic relies on:

- Flat design principles
- Color and typography for hierarchy
- Whitespace for separation
- Borders and backgrounds for component definition

This creates a clean, minimal interface without the complexity of layered shadows.

---

## Animations & Transitions

### Scroll Animation Classes

The system implements four directional scroll animations for revealing elements as they enter the viewport:

#### Scroll Up Animation
```css
.scroll-animate-up {
  opacity: 0;
  transform: translate(0px, 100px);
}
```
**Effect:** Elements start 100px below their final position with 0 opacity

---

#### Scroll Down Animation
```css
.scroll-animate-down {
  opacity: 0;
  transform: translate(0px, -100px);
}
```
**Effect:** Elements start 100px above their final position with 0 opacity

---

#### Scroll Right Animation
```css
.scroll-animate-right {
  opacity: 0;
  transform: translate(-100px, 0px);
}
```
**Effect:** Elements start 100px to the left of their final position with 0 opacity

---

#### Scroll Left Animation
```css
.scroll-animate-left {
  opacity: 0;
  transform: translate(100px, 0px);
}
```
**Effect:** Elements start 100px to the right of their final position with 0 opacity

---

#### Visible State (Animation Complete)
```css
.scroll-animate-visible {
  opacity: 1;
  transform: translate(0px);
}
```
**Effect:** Elements reach full opacity and their natural position

### Animation Implementation Pattern

**Usage:**
1. Apply directional class (`.scroll-animate-up`, etc.) to hidden elements
2. When element enters viewport, add `.scroll-animate-visible` class
3. CSS transitions handle the smooth animation (transition properties likely defined in external CSS)

**Design Notes:**
- 100px offset creates noticeable but not excessive motion
- Opacity fade works in tandem with position shift
- Directional options allow varied, dynamic page reveals

---

## Border Radius

**Critical Finding:** The design system uses **zero border radius** consistently:

```css
.Toastify__toast {
  border-radius: 0px;
}
```

All components maintain sharp, rectangular corners, contributing to a modern, geometric aesthetic. This is evident from:

- Toast notifications explicitly set to 0px
- No global border-radius definitions
- No rounded corners in component styles

**Design Implication:** The absence of rounded corners creates a bold, architectural feel and differentiates this system from softer, more organic design approaches.

---

## Opacity & Transparency

### Animation Opacity States

**Hidden State:**
```css
opacity: 0;
```
Applied to all scroll animation classes (`.scroll-animate-up`, `.scroll-animate-down`, etc.)

**Visible State:**
```css
opacity: 1;
```
Applied when `.scroll-animate-visible` class is added

### Usage Pattern

Opacity is primarily used for:
1. **Scroll reveal animations** - Elements fade in from 0 to 1
2. **Interactive transitions** - Smooth state changes
3. **Content layering** - (When combined with JavaScript for dynamic reveals)

**Note:** No intermediate opacity values (like 0.5, 0.8) are defined in the base styles, suggesting opacity is used as a binary state (hidden/visible) rather than for translucent layering effects.

---

## Breakpoint System

The design system implements a **mobile-first responsive approach** with three major breakpoints:

### Breakpoint Definitions

| Breakpoint | Min-Width | Target Devices | Usage |
|------------|-----------|----------------|-------|
| **Mobile** | Default | 0 - 727px | Phones in portrait/landscape |
| **Tablet** | `728px` | 728px - 959px | Tablets, small laptops |
| **Desktop** | `960px` | 960px - 1301px | Standard desktops, larger tablets |
| **Large Desktop** | `1302px` | 1302px+ | Wide screens, high-res displays |

### Responsive Typography Scaling

**H1 Progression:**
- Mobile: 30px → Tablet (728px): 56px → Desktop (960px): 80px

**H2 Progression:**
- Mobile: 24px → Tablet (728px): 32px → Desktop (960px): 40px

**H3 Progression:**
- Mobile: 24px → Desktop (960px): 32px

**H4 Progression:**
- Mobile: 18px → Tablet (728px): 24px → Desktop (960px): 32px

**H5 Progression:**
- Mobile: 18px → Desktop (960px): 24px

**Label Progression:**
- Mobile: 14px (140% line-height) → Tablet (728px): 16px (160% line-height)

### Breakpoint Usage Examples

```css
/* Tablet and up */
@media (min-width: 728px) {
  h1 {
    font-size: 56px;
    line-height: 120%;
  }
}

/* Desktop and up */
@media (min-width: 960px) {
  h1 {
    font-size: 80px;
  }
}

/* Large desktop */
@media (min-width: 1302px) {
  html {
    scroll-padding-top: var(--header-desktop);
  }
}
```

---

## CSS Reset & Normalization

### Comprehensive Element Reset

```css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend, table, caption,
tbody, tfoot, thead, tr, th, td, article, aside,
canvas, details, embed, figure, figcaption, footer,
header, hgroup, menu, nav, output, ruby, section,
summary, time, mark, audio, textarea, video, button, input {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: 'Aeonik Mono', sans-serif;
  vertical-align: baseline;
  text-decoration: none;
}
```

**Key Reset Features:**
1. **Border-box sizing** - Makes width/height calculations predictable
2. **Zero margins/padding** - Removes browser defaults
3. **Zero borders** - Eliminates unexpected borders
4. **100% font size** - Prevents browser font-size inheritance issues
5. **Aeonik Mono default** - Establishes base typography
6. **Baseline alignment** - Standardizes vertical positioning
7. **No text decoration** - Removes default underlines from links

### HTML & Body Settings

```css
body {
  line-height: 1;
  background-color: #F4EFEA;
  color: #383838;
  min-height: 100vh;
}

html {
  scroll-padding-top: var(--header-mobile);
}
```

**Body Characteristics:**
- Minimal line-height (1) - overridden by component-specific values
- Warm cream background establishing the color palette
- Dark gray text for readability
- Full viewport height minimum for proper scrolling

---

## CSS Custom Properties (Variables)

The system references several CSS custom properties, though their definitions are in external stylesheets:

### Referenced Variables

```css
--header-mobile
--header-desktop
--eyebrow-desktop
```

**Usage Context:**

1. **`--header-mobile`** - Height of mobile header, used for scroll-padding
2. **`--header-desktop`** - Height of desktop header (≥1302px), used for scroll-padding
3. **`--eyebrow-desktop`** - Height of eyebrow/announcement bar (≥728px), used for scroll-margin

### Variable Pattern

Variables control **dynamic spacing values** that change based on:
- Layout mode (mobile vs desktop)
- Component visibility (headers, eyebrows)
- Responsive breakpoints

**Implementation Pattern:**
```css
/* Mobile first */
scroll-padding-top: var(--header-mobile);

/* Desktop override */
@media (min-width: 1302px) {
  scroll-padding-top: var(--header-desktop);
}
```

---

## External Font Loading

### Open Sans Integration

The system loads **Open Sans** from Google Fonts with extensive Unicode range support for internationalization:

**Weights Available:**
- 400 (Regular)
- 700 (Bold)

**Character Set Support:**
- Latin (basic and extended)
- Cyrillic
- Greek
- Hebrew
- Vietnamese
- Mathematical operators
- Emoji and symbols
- And many more Unicode ranges

**Implementation:**
```css
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/opensans/...) format('woff2');
  unicode-range: U+0000-00FF, U+0131, ...;
}
```

**Note:** While extensively defined, Open Sans appears to be a fallback or supplementary font, with Aeonik Mono and Inter serving as the primary typefaces.

---

## Common Patterns in Project

### 1. Mobile-First Approach
All base styles target mobile, with `@media (min-width: ...)` queries adding complexity for larger screens.

### 2. Uppercase Typography
All heading levels use `text-transform: uppercase` for visual consistency and impact.

### 3. Minimal Weight Variation
- Headings: 400 (regular)
- Body text: 300 (light)
- Labels: 400 (regular)
- Superscripts: 600 (semi-bold)

### 4. Zero-Based Spacing
All elements reset to zero margin/padding, requiring explicit spacing definitions.

### 5. Flat Design Aesthetic
No shadows, minimal borders, zero border-radius for a clean, modern look.

### 6. Scroll Animation System
Four-directional fade + translate animations for progressive element reveals.

### 7. Custom Scrollbar Styling
Minimal scrollbars (5px) for a refined, less intrusive scrolling experience.

### 8. Semantic HTML5
Reset includes modern elements like `article`, `aside`, `figure`, `nav`, `section`.

### 9. Accessibility Considerations
- High contrast text (#383838 on #F4EFEA)
- Proper scroll padding for fixed headers
- Generous letter spacing (0.02em)
- Strong line-height values (140%+)

---

## Example Component Reference

### Article Card Component

```html
<article class="scroll-animate-up">
  <h3>Article Title in Uppercase</h3>
  <p>Body text using Inter with light weight and generous letter spacing for comfortable reading.</p>
  <a href="#">Read More</a>
</article>
```

**Styling Breakdown:**
- `<article>` - Uses default Aeonik Mono, no margin/padding from reset
- `.scroll-animate-up` - Initially hidden (opacity: 0, translated down 100px)
- `<h3>` - Aeonik Mono, uppercase, 24px mobile / 32px desktop
- `<p>` - Inter, 300 weight, 16px, 140% line-height, 0.02em letter-spacing
- `<a>` - Dark gray (#383838), 0.22em underline offset

---

### Button Component Pattern

```html
<button type="button" class="primary-button">
  Click Me
</button>
```

**Expected Styling (based on resets):**
- Font: Aeonik Mono (from global reset)
- Zero margin/padding (from reset, styled contextually)
- No border (from reset)
- Background/padding/border likely defined in external CSS
- Uppercase transformation (common pattern)

---

### Form Label Example

```html
<label for="email">Email Address</label>
<input type="email" id="email" name="email">
```

**Label Styling:**
- Font: Inter, Arial, sans-serif
- Weight: 400 (regular)
- Size: 14px mobile → 16px tablet (≥728px)
- Line-height: 140% mobile → 160% tablet

**Input Styling:**
- Font: Aeonik Mono (from global reset)
- Zero margin/padding/border (from reset)
- Contextual styling in external CSS

---

### Hero Section Example

```html
<section class="hero scroll-animate-up">
  <h1>Welcome to Our Platform</h1>
  <p>Discover innovative solutions for modern challenges with our comprehensive suite of tools.</p>
</section>
```

**Styling Details:**
- `<section>` - Block display (from reset override)
- `.scroll-animate-up` - Fade + translate animation on scroll
- `<h1>` - 30px mobile → 56px tablet → 80px desktop, uppercase, 400 weight
- `<p>` - Inter font, 300 weight, 16px, enhanced letter-spacing

---

## Design System Recommendations

### Strengths
1. ✅ **Consistent Typography** - Clear hierarchy with responsive scaling
2. ✅ **Mobile-First** - Progressive enhancement approach
3. ✅ **Minimal Color Palette** - Reduces cognitive load
4. ✅ **Accessibility** - High contrast, generous spacing
5. ✅ **Clean Aesthetic** - Flat design, sharp corners, minimal scrollbars
6. ✅ **Animation System** - Engaging scroll reveals

### Potential Enhancements
1. **Document CSS Variables** - Define `--header-mobile`, `--header-desktop`, `--eyebrow-desktop` values
2. **Spacing Scale** - Consider adding a documented spacing scale (8px, 16px, 24px, 32px, etc.)
3. **Color System** - Expand palette for states (success, warning, error)
4. **Component Library** - Create documented, reusable component patterns
5. **Focus States** - Define accessible focus indicators for keyboard navigation
6. **Dark Mode** - Consider alternate color scheme using CSS custom properties

---

## Technical Specifications Summary

| Aspect | Specification |
|--------|--------------|
| **Primary Font** | Aeonik Mono (monospace) |
| **Body Font** | Inter (sans-serif) |
| **Background** | #F4EFEA (cream/beige) |
| **Text Color** | #383838 (dark gray) |
| **Accent Color** | #2BA5FF (bright blue) |
| **Mobile Breakpoint** | Default (0-727px) |
| **Tablet Breakpoint** | 728px |
| **Desktop Breakpoint** | 960px |
| **Large Desktop** | 1302px |
| **Border Radius** | 0px (sharp corners) |
| **Shadows** | None (flat design) |
| **Scrollbar Width** | 5px |
| **Animation Distance** | 100px (translate) |
| **Letter Spacing** | 0.02em (body text) |

---

## Conclusion

This design system prioritizes **clarity, minimalism, and responsiveness**. The combination of Aeonik Mono and Inter creates sophisticated typographic contrast, while the warm cream background and dark gray text ensure comfortable reading. The absence of shadows and border radius reinforces a modern, architectural aesthetic. Scroll animations add dynamism without overwhelming the clean design.

The mobile-first approach with well-defined breakpoints ensures the interface adapts gracefully across devices. Overall, this is a thoughtfully constructed system that balances aesthetic appeal with functional design principles.

---

**Generated from CSS analysis**
**Version:** 1.0
**Last Updated:** November 2025

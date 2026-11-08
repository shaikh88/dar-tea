# UI Guidelines

## Design Principles

- Minimal
- Responsive
- Accessible
- Mobile First

## Visual Identity: Misty Estate

Modern tea-house elegance inspired by Darjeeling's mist, tea gardens, aged paper,
and amber tea. Keep roughly 75% light neutrals, 20% greens, and 5% amber accents.
Use semantic Tailwind tokens defined in `src/app/globals.css`, not ad hoc hex colors
or the default emerald/stone scales.

| Token | Color | Usage |
| --- | --- | --- |
| `background` | `#F7F5EF` | Mountain Ivory page background |
| `surface` | `#FFFDF8` | Porcelain cards, controls, light text on dark green |
| `estate` | `#173F35` | Primary actions, branding, active navigation, footer |
| `estate-deep` | `#102E27` | Deep green emphasis |
| `leaf` | `#426553` | Hover states, secondary accents, focus rings |
| `mist` | `#E5EBE2` | Alternate sections and selected controls |
| `mist-ridge` | `#D5E1D6` | Illustration hills and gradient endpoint |
| `amber` | `#A66B32` | Decorative rules and navigation underlines, not small text |
| `ink` / `foreground` | `#24332D` | Headings, body text, prices |
| `muted` | `#59665E` | Supporting text |
| `line` | `#D9DFD5` | Decorative borders and dividers |
| `control` | `#829287` | Input borders with stronger contrast |

Keep semantic red error/destructive and amber warning variants distinct from
brand accents. Selected controls use mist backgrounds with estate text/borders.

### Depth and Gradients

- `bg-mist-gradient`: ivory to sage, reserved for illustration/hero backdrops.
- `shadow-card`: subtle green-tinted depth for cards and form panels.
- `shadow-float`: elevated hero artwork and interactive card hover/focus.
- Use fine borders for structure; no glossy buttons, gradient text, or heavy shadows.
- Keep transitions short (200-300ms), and disable animation/transitions for reduced motion.

## Framework

- Tailwind CSS
- shadcn/ui

## Typography

Manrope is the body/control font. Fraunces is the heading/editorial font, with
occasional italics for storytelling. Both are loaded through `next/font/google`
in the root layout and self-hosted by Next.js; visitors do not request Google fonts.
Builds need access to download the fonts. Use `font-sans` and `font-serif` rather
than hard-coded font families. Keep prices and functional labels sans-serif.

### Page Heading

text-4xl
font-bold

### Section Heading

text-2xl
font-semibold

### Body Text

text-base

## Border Radius

Use:

rounded-xl

Avoid multiple radius standards.

## Spacing

Use Tailwind spacing scale only.

Preferred:

- 4
- 6
- 8
- 12
- 16

## Buttons

### Primary

Estate Green with Porcelain text, Tea Leaf hover, and a subtle card shadow.
Use the shared button/link styles in `src/components/ui/button.tsx`.

### Secondary

Estate Green outline and text, transparent background, Mist Sage hover.

### Destructive

Red Variant

## Forms

Every field must include:

- Label
- Placeholder
- Validation
- Error State

Use the shared `Select` in `src/components/ui/select.tsx` for catalog filters and
pack selection, rather than native dropdown menus. It uses a labeled combobox,
a styled listbox, and a hidden input for form submission. Preserve keyboard
navigation (arrows, Home/End, typeahead, Enter/Space), Escape/Tab dismissal, and
focus return after selection. Menus use Porcelain surfaces, green active rows,
checkmarks for selected options, and a soft floating shadow.

Use `field-control` for text inputs and select triggers. Focus/open states use
a 2px outline inset into the existing border (`outline-offset: -2px`), producing
one continuous edge rather than a detached second ring. Keep keyboard focus
visible; other links/buttons retain their standard focus rings.

## Accessibility

Required:

- Keyboard Navigation
- Focus States
- aria labels where necessary
- Accessible Forms
- At least 4.5:1 contrast for normal text and 3:1 for control boundaries/focus rings
- Use Porcelain focus rings on dark green surfaces (such as footer links)
- Never use color alone to communicate selected, error, or availability states
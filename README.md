# Anjana Ilangasinghe — Developer Portfolio

A premium, modern single-page developer portfolio website designed with a dark/light cyberpunk aesthetic, fluid layouts, and modular web architecture. The site showcases professional experiences, academic accomplishments, and categorized project lists.

---

## 🛠️ Tech Stack & Frameworks

The application is built using standard React frameworks and modular vanilla styling systems:

*   **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) — leveraged for static page optimization, automatic pre-rendering, metadata management, and optimal asset serving.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) — provides static type safety and scalable code signatures across components.
*   **Styling System**: [CSS Modules (Vanilla CSS)](https://github.com/css-modules/css-modules) — ensures complete layout control, scoped component classnames, smooth cubic-bezier transitions, and variable overrides.
*   **Typography**: Next.js Google Fonts wrapper hosting *Plus Jakarta Sans* and *JetBrains Mono* to prevent layout shifts.
*   **Form Processing**: [FormSubmit AJAX](https://formsubmit.co/) — routes messages asynchronously from the contact page straight to the developer's inbox.

---

## 📐 Project Architecture & Structure

The repository follows a clean Next.js directory convention, separating routing configs from functional UI components:

```text
├── public/                 # Static assets (screenshots, profile photo, PDF templates)
└── src/
    ├── app/                # Next.js App Router config & layouts
    │   ├── favicon.ico
    │   ├── globals.css     # Global theme tokens (animations, resets, variables)
    │   ├── layout.tsx      # Head configuration, SEO meta tags, and script injection
    │   ├── page.module.css # Main landing page background layouts
    │   └── page.tsx        # Entry point mounting custom sections
    └── components/         # Modular client-side components
        ├── Loader          # Preloader screen with 0-100% progress counting bar
        ├── Navbar          # Sticky navigation header with mobile drawer burger menu
        ├── SocialFloatingBar # Vertical social links sidebar
        ├── Hero            # Centered introduction banner with terminal markup window
        ├── About           # Academic biography and skillset grids
        ├── Experience      # Timelines detailing professional milestones
        ├── Projects        # Dynamic project grids (Featured & Industry Systems)
        └── Contact         # Asynchronous client feedback form
```

### Key Architectural Systems

#### 1. Zero-Flash Theme Bootstrapping
To implement a persistent Dark/Light mode theme switch, the site bypasses server-client hydration mismatches using a blocking script injection in the document `<head>` inside [layout.tsx](src/app/layout.tsx). This immediately resolves the client theme configuration from `localStorage` and appends `data-theme` on the `html` element *before* the HTML parser draws the viewport, preventing the flash of wrong background colors on reload. 

#### 2. Suppressed Hydration Warnings
Because root HTML classes are intentionally altered by the theme bootstrapping script prior to React client-side initialization, the `suppressHydrationWarning` attribute is configured on the `<html>` root to keep Next.js dev consoles clean of React hydration mismatch indicators.

#### 3. Centered Viewport Grid Layout
The redesigned Hero section implements a mathematically centered layout by utilizing a three-column CSS Grid:
```css
grid-template-columns: 1fr 2.5fr 1fr;
```
The central text and profile assets occupy column 2, while the `developer.ts` code card sits in column 3. This centers your introduction context directly in the center of the viewport (50% screen width) while allowing the code card to float on the right edge as a balanced supporting detail.

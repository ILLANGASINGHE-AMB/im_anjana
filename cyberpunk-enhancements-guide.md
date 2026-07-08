# Cyberpunk Enhancement Guide — im_anjana Portfolio

All effects below use continuous, eased motion (typing, drifting, glowing, tilting) rather than rapid flashing or strobing, so they're safe for people with photosensitivity. Section 0 adds a global safety net so decorative motion automatically respects the OS-level "reduce motion" setting.

No new npm dependencies are required — everything is plain CSS + React (`useState`/`useEffect`/refs), consistent with your current stack.

---

## 0. Global setup — reduced motion safety net

Add this to `src/app/globals.css`, anywhere after your `:root` block:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This alone means every keyframe animation you add below is automatically disabled for anyone who has that OS setting on. You don't need to guard each animation individually.

---

## 1. Atmosphere layer

### 1a. Static scanline + grain overlay

Add a second fixed layer in `globals.css`, alongside your existing `body::before` glow layer:

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  background:
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.02) 0px,
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px,
      transparent 3px
    );
  mix-blend-mode: overlay;
  opacity: 0.5;
}
```

This is a static texture — no animation, so there's zero flicker risk. It just gives the CRT look.

### 1b. Slow-drifting grid background

Add to `globals.css`:

```css
.cyberGrid {
  position: fixed;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(var(--border-muted) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-muted) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridDrift 30s linear infinite;
  opacity: 0.4;
}

@keyframes gridDrift {
  from { background-position: 0 0; }
  to   { background-position: 40px 40px; }
}
```

Render it once near the top of `src/app/page.tsx`:

```tsx
<div className="cyberGrid" aria-hidden="true" />
```

A 30-second loop reads as ambient background texture, not a distraction.

### 1c. Custom cursor with a trailing glow

Create `src/components/CustomCursor.tsx`:

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only show on devices with a precise pointer (skip touch/mobile)
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        marginLeft: -12,
        marginTop: -12,
        borderRadius: "50%",
        background: "var(--accent-primary)",
        filter: "blur(6px)",
        opacity: 0.6,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
```

Mount it once in `src/app/page.tsx`:

```tsx
import CustomCursor from "@/components/CustomCursor";
// ...
<CustomCursor />
```

The `0.15` easing factor is what makes the glow lag smoothly behind the real cursor instead of snapping to it.

---

## 2. Hero section

### 2a. Typewriter effect on the terminal block

Add this hook near the top of `src/components/Hero.tsx` (or in a small `hooks/useTypewriter.ts` file):

```tsx
function useTypewriter(lines: string[], speed = 25) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    const full = lines.join("\n");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setOutput(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [lines, speed]);
  return output;
}
```

Use it inside the `Hero` component, replacing the static `<pre>` content:

```tsx
const typed = useTypewriter([
  'const developer = {',
  '  name: "Anjana",',
  '  role: "Full-Stack Developer",',
  '  passion: "Building modern web apps with AI-powered tools"',
  '};',
]);

// in the JSX, replace the existing <pre><code>...</code></pre> block with:
<pre className={styles.codeBlock}>
  <code>
    {typed}
    <span className={styles.cursorBlink}>█</span>
  </code>
</pre>
```

Add to `Hero.module.css`:

```css
.cursorBlink {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
```

### 2b. Slow gradient shimmer on your name

You already have `--accent-gradient-rainbow` defined in `globals.css`. Add a shimmer version to `Hero.module.css`:

```css
.highlightText {
  background: var(--accent-gradient-rainbow);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 6s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 0% center; }
  50%  { background-position: 100% center; }
  100% { background-position: 0% center; }
}
```

A 6-second ease is slow enough to feel like a glowing sheen rather than a flashy effect.

---

## 3. Loader — boot sequence

Update `src/components/Loader.tsx` to show status lines instead of (or alongside) the progress percentage:

```tsx
"use client";
import { useState, useEffect } from "react";
import styles from "./Loader.module.css";

const BOOT_LINES = [
  "INITIALIZING SYSTEM...",
  "LOADING ASSETS...",
  "COMPILING INTERFACE...",
  "READY",
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    let timer: NodeJS.Timeout;
    const startTime = Date.now();
    const duration = 2000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(calculatedProgress);

      // Reveal one boot line roughly every 25% of progress
      const linesToShow = Math.min(
        BOOT_LINES.length,
        Math.floor((calculatedProgress / 100) * BOOT_LINES.length) + 1
      );
      setVisibleLines(BOOT_LINES.slice(0, linesToShow));

      if (calculatedProgress < 100) {
        timer = setTimeout(updateProgress, 30);
      } else {
        timer = setTimeout(() => {
          setIsFadingOut(true);
          timer = setTimeout(() => setShouldRender(false), 600);
        }, 400);
      }
    };
    updateProgress();

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.loaderOverlay} ${isFadingOut ? styles.fadeOut : ""}`}>
      <div className={styles.bootLines}>
        {visibleLines.map((line) => (
          <p key={line} className={styles.bootLine}>{line}</p>
        ))}
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
```

Add to `Loader.module.css`:

```css
.bootLines {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-cyan);
  margin-bottom: 1.5rem;
  min-height: 100px;
}

.bootLine {
  opacity: 0;
  animation: fadeInLine 0.4s ease forwards;
}

@keyframes fadeInLine {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.progressTrack {
  width: 240px;
  height: 3px;
  background: var(--bg-tertiary);
  border-radius: 2px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  background: var(--accent-gradient-1);
  transition: width 0.15s linear;
}
```

Same boot-sequence feel as a glitchy loader, but every transition is a smooth fade or linear fill.

---

## 4. Scroll-triggered reveals

### 4a. Reusable `Reveal` wrapper

Create `src/components/Reveal.tsx`:

```tsx
"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
```

Wrap items in `About.tsx`, `Experience.tsx`, `Projects.tsx`, and `Contact.tsx` with it, staggering the `delay` prop per item:

```tsx
{categories.map((cat, i) => (
  <Reveal key={cat.title} delay={i * 0.1}>
    <div className={styles.skillCard}>{/* ...existing card content... */}</div>
  </Reveal>
))}
```

Same pattern applies to the project cards in `Projects.tsx` and the timeline items in `Experience.tsx`.

### 4b. Timeline line draw (Experience section)

Wrap the whole timeline list in a container and animate a pseudo-element line's height using the same `Reveal`-style `IntersectionObserver` pattern, but tracking scroll progress through the section rather than a single in/out trigger:

```tsx
// In Experience.tsx
const sectionRef = useRef<HTMLDivElement>(null);
const [lineProgress, setLineProgress] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const total = rect.height;
    const scrolled = Math.min(Math.max(viewportH - rect.top, 0), total);
    setLineProgress(Math.min((scrolled / total) * 100, 100));
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

```tsx
<div ref={sectionRef} className={styles.timeline}>
  <div className={styles.timelineLine} style={{ height: `${lineProgress}%` }} />
  {/* existing timeline items */}
</div>
```

```css
/* Experience.module.css */
.timeline {
  position: relative;
}
.timelineLine {
  position: absolute;
  left: 0; /* adjust to match your existing timeline marker position */
  top: 0;
  width: 2px;
  background: var(--accent-gradient-1);
  transition: height 0.1s linear;
}
```

### 4c. Scroll progress bar

Create `src/components/ScrollProgress.tsx`:

```tsx
"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: `${progress}%`,
        background: "var(--accent-gradient-1)",
        zIndex: 1000,
        transition: "width 0.1s linear",
      }}
    />
  );
}
```

Mount it in `src/app/page.tsx`, near `<Navbar />`:

```tsx
<ScrollProgress />
```

---

## 5. Cards & interactions

### 5a. 3D tilt on hover (Projects.tsx)

Add a handler to each project card wrapper:

```tsx
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease" }}
    >
      {children}
    </div>
  );
}
```

Wrap each project card's existing markup with `<TiltCard>...</TiltCard>` in `Projects.tsx`.

### 5b. Traveling border glow

Add to `Projects.module.css` (or wherever your `.glass-card`-based project card class lives):

```css
.projectCard {
  position: relative;
}

.projectCard::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  padding: 2px;
  background: conic-gradient(
    from 0deg,
    var(--accent-primary),
    var(--accent-cyan),
    var(--accent-secondary),
    var(--accent-primary)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: rotateGlow 6s linear infinite;
  opacity: 0.5;
  z-index: -1;
}

@keyframes rotateGlow {
  to { transform: rotate(360deg); }
}
```

Always-on but slow (6s per full rotation), so it reads as ambient glow rather than a flash.

### 5c. Magnetic buttons (Hero CTAs)

Add a small hook and apply it to your `.btn` elements in `Hero.tsx`:

```tsx
function useMagnetic() {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return { ref, handleMouseMove, handleMouseLeave };
}
```

```tsx
const magnetic = useMagnetic();

<a
  ref={magnetic.ref}
  onMouseMove={magnetic.handleMouseMove}
  onMouseLeave={magnetic.handleMouseLeave}
  href="#industry-projects"
  className="btn btn-primary"
  style={{ transition: "transform 0.15s ease" }}
>
  View My Work
</a>
```

---

## 6. Micro-details

### 6a. Animated stat counters (About section)

Your `About.tsx` currently lists skill categories as tags. A nice complementary addition is a small stats row (e.g. years coding, projects shipped) that counts up once scrolled into view:

```tsx
function useCountUp(target: number, duration = 1200, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [start, target, duration]);
  return value;
}
```

Wrap the stats row in a `Reveal`-style `IntersectionObserver` (or reuse the `Reveal` component's visibility state) to trigger `start` only once it's on screen.

### 6b. Neon focus glow (Contact form)

Add to `Contact.module.css`:

```css
.input:focus,
.textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15), 0 0 16px rgba(139, 92, 246, 0.25);
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}
```

A smooth opacity/shadow transition — no flicker, just a "powering up" feel.

### 6c. Availability badge — keep it slow

Your `badgePulse` in Hero already does a breathing pulse. Just make sure its keyframe (likely reusing `pulseGlow` from `globals.css`) runs on a slow duration:

```css
.badgePulse {
  animation: pulseGlow 2.5s ease-in-out infinite;
}
```

2–3 seconds per cycle reads as "alive," not alarming. Avoid anything under ~1 second for this kind of ambient indicator.

---

## Suggested build order

1. Section 0 (safety net) — do this first, always.
2. Section 4 (scroll reveals + progress bar) — biggest visual impact for the least risk.
3. Section 2 (Hero typewriter + shimmer) — high visibility, first thing visitors see.
4. Section 1 (atmosphere: grid, scanlines, cursor) — sets the overall mood.
5. Section 5 (card tilt + glow + magnetic buttons) — polish layer.
6. Section 3 (Loader) and Section 6 (micro-details) — final touches.

Test each addition with your OS's "reduce motion" setting toggled on to confirm section 0 is catching everything as expected.

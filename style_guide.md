# Portfolio Design System & Style Guide

## 🎨 Color Palette

| Variable | Value | Description |
| :--- | :--- | :--- |
| **Background** | `#000000` | Pure black for maximum contrast and depth. |
| **Text (Body)** | `#ECECEC` | Off-white for high contrast but soft readability. |
| **Accent** | `#21d4fd` | **Electric Cyan**. Used for key highlights, hover states, and borders. |
| **Glass BG** | `rgba(255, 255, 255, 0.05)` | Base opacity for glass cards. |
| **Glass Border** | `rgba(255, 255, 255, 0.1)` | Subtle border for glass elements. |

### Gradients
*   **Headings:** `linear-gradient(to bottom, #fff, #888)`
    *   *Usage:* Logo, H1, Section Titles, Project Titles.
    *   *Effect:* Metallic, premium look. Matches the "Thin" font weight.
*   **Hero Overlay:** `radial-gradient(circle at center, rgba(33, 212, 253, 0.08) 0%, rgba(0, 0, 0, 0) 70%)`
    *   *Usage:* Hero section background.
    *   *Effect:* Subtle central glow that fades to complete transparency (seamless blend).

---

## ✒️ Typography

### Fonts
1.  **Primary Font:** `'Poppins', sans-serif`
    *   Used for: **Everything** (Body, Headings, UI, Navigation).
    *   *Why:* Geometric, clean, and modern. Replaces Inter for a more characterful look.

### Hierarchy
*   **H1 (Hero):** 4rem, Weight 200 (Thin), Tracking -2px.
*   **Section Titles:** 3rem, Weight 200 (Thin), Tracking -1px.
*   **Project Titles:** 1.5rem, Weight 700 (Bold), Tracking -0.5px.
*   **Body Text:** 1rem to 1.5rem, Weight 300 (Light), Line-height 1.6.
*   **Logo:** 1.4rem, Weight 200, Uppercase, Tracking 3px.

---

## 🔮 Glassmorphism (The "Glass" Effect)
To replicate the glass effect, use this combination:
```css
background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
border-radius: 20px;
```

---

## ✨ Component Styles

### 1. Navigation
*   **Bar:** Fixed, transparent at top, becomes Glass on scroll.
*   **Links:** Uppercase, Poppins, tracked out (1.5px).
*   **Hover:** Cyan underline expands from 0% to 100%.

### 2. Project Cards
*   **Style:** Glassmorphic container.
*   **Hover:** Lifts up (-8px), Cyan border (`rgba(33, 212, 253, 0.3)`), Cyan glow (`rgba(33, 212, 253, 0.1)`).
*   **Tech Pills:**
    *   **Default:**
        *   Background: `rgba(33, 212, 253, 0.05)` (Subtle Cyan tint).
        *   Border: `rgba(33, 212, 253, 0.3)`.
        *   Text: Cyan.
    *   **Hover:**
        *   Background: `rgba(33, 212, 253, 0.1)` (Slightly stronger tint).
        *   Box Shadow: `0 4px 10px rgba(33, 212, 253, 0.1)` (Soft glow).
        *   *Note:* Matches parent card aesthetic (no longer "flashy" solid fill).

### 3. Skills (Tags)
*   **Style:** Pill shape, glass background (`rgba(255, 255, 255, 0.03)`).
*   **Hover:** Glows with Cyan (`rgba(33, 212, 253, 0.2)`), border highlights, lifts up.

### 4. Interactive Elements
*   **Scrollbar:** Width 10px, Track `#000000`, Thumb Grey (turning Cyan on hover).
*   **Social Icons:** Turn Cyan (`#21d4fd`) on hover.

---

## 🖱️ Cursor (Interactive Tubes)

### States
1.  **Vibrant (Default):**
    *   **Tubes:** Cyan, Purple, Pink (`#5e72e4`, `#8965e0`, `#f5365c`).
    *   **Lights:** High Intensity (200), Multicolor.
2.  **Subtle (Reading Mode):**
    *   **Tubes:** Grayscale (`#4a4a4a`, `#2a2a2a`).
    *   **Lights:** Low Intensity (50), White/Gray.

### Behavior
*   **Auto-Switch:** Automatically transitions to **Subtle Mode** after **5 seconds** of page load.
*   **Click Toggle:** Clicking anywhere on the screen toggles between **Vibrant** and **Subtle** modes instantly.

---

## 🎬 Animations
*   **Fade In Up:** Elements translate 30px up and fade in (transition 0.8s).
*   **Scroll Indicator:** Bounces infinitely (2s duration).
*   **Typewriter:** Characters appear one by one (30ms speed).

# Portfolio Website (v2.0)

Welcome to the codebase for my personal portfolio website. This project is built to be fast, elegant, and interactive, showcasing my work as a UI/UX Designer & Developer.

## 🏗️ Architecture (How it's built)

This is a **static web application** built with pure, standard web technologies. No complex frameworks or build steps are required to run it.

*   **HTML5 (`index.html`)**: The skeleton of the site. It holds all the content (text, images, links).
*   **CSS3 (`style.css`)**: The skin of the site. It handles all the colors, layouts, fonts, and animations.
*   **JavaScript (`script.js`)**: The brain. It handles interactions like the typewriter effect, scroll animations, and mobile menu.
*   **Cursor Logic**: Embedded directly in `index.html` for performance, powering the 3D tubes effect.

## 🎨 Design & Styles

The design follows a **"Cyan Glass"** aesthetic:

*   **Colors**:
    *   **Background**: Deep Black (`#000000`) for maximum contrast.
    *   **Accent**: Electric Cyan (`#21d4fd`) for buttons, glowing edges, and hover effects.
    *   **Text**: Off-white (`#ECECEC`) for easy reading.
*   **Typography**:
    *   We use **Poppins** for everything. It's a clean, geometric font that looks modern and professional.
*   **Glassmorphism**:
    *   Cards and navigation bars look like frosted glass (`backdrop-filter: blur`).
    *   They have subtle white/cyan borders to separate them from the dark background.

## 🖱️ The "Tubes" Cursor Animation

The coolest feature of this site is the interactive 3D cursor. It's a "Tube" that follows your mouse, creating a trail of light.

### How it works:
It uses a lightweight 3D library called **Three.js** (via a helper library) to draw tubes in real-time on a canvas overlay.

### Features:
1.  **Two Themes**:
    *   **Vibrant**: Bright Cyan, Purple, and Pink tubes with glowing lights. (Default)
    *   **Subtle**: Grayscale tubes with dim white lights. (For reading)
2.  **Auto-Switch**:
    *   When you load the page, it starts **Vibrant** to wow you.
    *   After **5 seconds**, it automatically switches to **Subtle** so it doesn't distract you while you read.
3.  **Click to Toggle**:
    *   Want the colors back? Just **click anywhere**!
    *   Click again to go back to subtle mode. You have full control.

## 🚀 How to Run

Since there are no build steps, you can simply:

1.  Open the folder in VS Code.
2.  Use the "Live Server" extension to launch `index.html`.
3.  That's it!

---

*Designed & Developed by Abhijit Singh*

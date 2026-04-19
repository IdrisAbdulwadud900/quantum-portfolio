# ⟁ Quantum Portfolio

A futuristic, single-page portfolio with cinematic motion, glassmorphism, magnetic interactions, a custom cursor, and an animated quantum particle field.

> **Status:** Scaffold ready. Drop in your details and ship.

---

## 🚀 Run it

No build step. Just open the file:

```bash
open "index.html"
```

Or serve it locally for best results (live reload, correct module loading):

```bash
# from the project folder
python3 -m http.server 5173
# then visit http://localhost:5173
```

---

## ✏️ How to make it YOURS (the only file you need to edit for content)

Open [scripts/main.js](scripts/main.js) and fill in the `PROFILE` object at the very top:

```js
const PROFILE = {
  name:      "Your Name",
  age:       "21",
  role:      "Product Engineer & Designer",
  location:  "Lagos, Nigeria",
  hobby:     "playing chess at 2am",
  learning:  "WebGPU & quantum computing",

  years:     "5",
  projects:  "32",

  "project1-name": "Aurora", "project1-desc": "...", "project1-date": "Q1 2026",
  "project2-name": "Helix",  "project2-desc": "...", "project2-date": "Q2 2026",
  "project3-name": "Nova",   "project3-desc": "...", "project3-date": "Q3 2026",

  email:     "you@domain.com",
  github:    "https://github.com/you",
  twitter:   "https://twitter.com/you",
  linkedin:  "https://linkedin.com/in/you",
  dribbble:  "https://dribbble.com/you",
};
```

Every placeholder in [index.html](index.html) (anything that looks like `[Your Name]`) is auto-replaced from this object. No hunting through HTML.

---

## 🎨 Design language

- **Theme:** Deep-space dark with violet → cyan → magenta gradient identity.
- **Type:** *Space Grotesk* (display) · *Instrument Serif* (italic accents) · *JetBrains Mono* (eyebrows / data).
- **Surfaces:** Frosted glass cards with hairline gradient borders.
- **Motion:** Word-by-word hero reveal, scroll-triggered fade-up, magnetic cursor, 3D tilt, animated gradient mesh background, live particle field that reacts to your mouse.
- **Accessibility:** Honors `prefers-reduced-motion`, full keyboard navigation, semantic landmarks.

---

## 📁 Structure

```
quantum portfolio/
├── index.html         ← markup & sections
├── styles/
│   └── main.css       ← design system & animations
├── scripts/
│   └── main.js        ← PROFILE data + interactivity
└── README.md
```

---

## 🧩 Sections

1. **Hero** — kinetic title, animated stats, CTA
2. **About** — your story + quick-info side cards
3. **Skills** — six core stacks with animated proficiency bars
4. **Capabilities** — marquee + 6 service tiles
5. **Now** — what you're currently building
6. **Passions** — what sets you on fire
7. **Contact** — gradient mailto + socials

---

## 🛠 Tweaking colors

In [styles/main.css](styles/main.css), edit the `:root` tokens:

```css
--accent-1: #7c5cff;   /* violet */
--accent-2: #00e5ff;   /* cyan */
--accent-3: #ff5cb4;   /* magenta */
--accent-4: #b8ff5c;   /* lime */
```

---

When you're ready, send me your real bio details and I'll wire them in for you.

# Aakash Barasiya — Portfolio Website

A premium, fully responsive personal developer portfolio built with **pure HTML5, CSS3 and Vanilla JavaScript** — no frameworks, no libraries beyond Google Fonts and Font Awesome icons (CDN).

---

## 📁 Folder Structure

```
portfolio/
│
├── index.html
│
├── css/
│   ├── style.css          # theme, layout, components
│   ├── responsive.css     # breakpoints (320px → 1920px)
│   └── animations.css     # keyframes & animation helpers
│
├── js/
│   ├── projects.js        # project data, links config, filtering, project modal
│   ├── animations.js      # typing effect, scroll reveal, counters, particles, tilt
│   └── main.js             # skills/education/testing/certs/journey data, nav,
│                            # theme toggle, cursor, modals, contact form, init
│
├── assets/
│   ├── favicon.png                       # generated site icon (already included)
│   ├── Aakash-Barasiya-Resume.pdf        # ⚠️ ADD YOUR OWN RESUME FILE HERE
│   └── certificates/                     # ⚠️ ADD CERTIFICATE IMAGES HERE
│
└── README.md
```

---

## 🚀 Setup

No build tools or installation required.

1. Download / clone the `portfolio` folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the best experience (recommended, since the contact form and some fetch behaviour work best over HTTP):

```bash
# Python
python3 -m http.server 5500

# Node (if you have npx)
npx serve .
```

3. Visit `http://localhost:5500` in your browser.

---

## 🌐 Deployment

### Deploy on Vercel
1. Push the `portfolio` folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repository.
3. Framework preset: **Other** (static site). Leave build command empty, output directory as root.
4. Click **Deploy**.

### Deploy on GitHub Pages
1. Push the folder contents to a GitHub repository (e.g. `aakash-portfolio`).
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/root` folder.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`.

---

## 🔗 Adding Project GitHub Links

Open `js/projects.js` and edit the `PROJECT_LINKS` object at the top of the file:

```js
const PROJECT_LINKS = {
  studentJobPortal: {
    github: "https://github.com/barasiya/student-job-portal",
    live: ""
  },
  attendanceSystem: {
    github: "https://github.com/barasiya/attendance-system",
    live: ""
  }
};
```

Leave a value as `""` to keep that button disabled and show **"Coming Soon"**.

## 🔗 Adding Live Demo Links

Same object as above — just fill in the `live` field with your deployed app URL (Vercel/Netlify/Render, etc.).

---

## 📜 Adding Certificate Files

All 8 real certificate images are already included in `assets/certificates/` and wired up in `js/main.js` (`certificationsData`). To add a new certificate later:

1. Place the image inside `assets/certificates/`.
2. Add an entry to `certificationsData` in `js/main.js` with `image: "assets/certificates/your-file.jpg"`.

---

## ✉️ Changing the Contact Email

The contact form uses [FormSubmit](https://formsubmit.co/) — no backend required.

1. Open `index.html` and find the form's `action` attribute:

```html
<form class="contact-form" id="contactForm" action="https://formsubmit.co/aakashbarasiya2001@gmail.com" method="POST">
```

2. Replace the email address with your own.
3. The **first submission** from a new email will trigger a confirmation email from FormSubmit — click the activation link to start receiving messages.

---

## 🖼️ Replacing the Profile Image

This portfolio intentionally uses a CSS-built developer terminal card instead of a stock photo in the hero section. If you'd like to add a personal photo elsewhere (e.g. in the About section):

1. Add your image to `assets/` (e.g. `assets/profile.jpg`).
2. Insert an `<img>` tag in the `about-text` block in `index.html`:

```html
<img src="assets/profile.jpg" alt="Aakash Barasiya" loading="lazy">
```

3. Style it via `css/style.css` as needed.

---

## 📄 Adding Your Resume PDF

1. Export your resume as a PDF named exactly: `Aakash-Barasiya-Resume.pdf`.
2. Place it inside the `assets/` folder.
3. The **Download Resume** buttons in the navbar, hero and mobile menu already point to `assets/Aakash-Barasiya-Resume.pdf` — no code changes needed.

---

## 📇 Save Contact (vCard)

A **"Save Contact"** button in the Contact section downloads `assets/Aakash-Barasiya.vcf` — a standard vCard file. Opening it on a phone prompts "Add to Contacts" (name, phone, email, socials all pre-filled). To update your info, edit `assets/Aakash-Barasiya.vcf` directly (plain text format).

---

## 📱 PWA — "Add to Home Screen"

The site includes `manifest.json`, PWA icons (`assets/icon-192.png`, `assets/icon-512.png`, `assets/apple-touch-icon.png`), `service-worker.js` for offline caching, and a **custom install banner** (bottom of the screen) that shows itself automatically — no need to dig through the browser's menu.

**How the banner behaves:**
- **Android/Chrome**: as soon as the browser is ready to offer installation, the banner slides up with an **Install** button — tapping it triggers the real browser install prompt.
- **iOS/Safari**: iOS never allows an automatic install prompt (Apple restriction, not a bug) — the banner instead shows manual instructions ("Tap Share, then Add to Home Screen") after a couple seconds.
- Dismissing the banner (✕) hides it for **7 days** — it won't nag on every visit. Adjust this in `js/main.js` by changing `sevenDays` inside `initInstallBanner()`.
- If the site is already installed and opened from the home screen icon, the banner never shows.

**Important:** this only activates when the site is served over **HTTPS** (e.g. your deployed Vercel URL) or `localhost` — it does **not** work when you just double-click `index.html` locally (`file://`), and it's **not included** in the standalone `Aakash-Barasiya-Portfolio.html` demo file (service workers require a real server origin).

If you ever change the site's core files, bump `CACHE_NAME` in `service-worker.js` (e.g. `v1` → `v2`) so returning visitors get the fresh version instead of a stale cached copy.

---

## 📈 Analytics

**Vercel Analytics** is already wired up (`<script defer src="/_vercel/insights/script.js">` in `index.html`) — it works automatically once you enable **Analytics** in your Vercel project dashboard (Project → Analytics tab, free tier available). No code changes needed.

**Google Analytics** (optional) — a commented-out snippet is included near the top of `index.html`. To enable it:
1. Create a property at [analytics.google.com](https://analytics.google.com) and get your Measurement ID (looks like `G-XXXXXXXXXX`).
2. Uncomment the snippet in `index.html` and replace both `G-XXXXXXXXXX` placeholders with your real ID.

---

## 🔍 SEO Extras Included

- **Open Graph + Twitter Card meta tags** — when the site link is shared on LinkedIn/WhatsApp/Twitter, a preview banner (`assets/og-image.png`) shows up instead of plain text.
- **JSON-LD Person structured data** — helps Google understand who the site belongs to for richer search results.
- If your domain changes from `aakash-barasiya-vlf5.vercel.app`, update the URLs in: `index.html` (`og:url`, `og:image`, `twitter:image`, the JSON-LD block), `robots.txt`, and `sitemap.xml`.

---

## ✅ Features

- Sticky glassmorphism navbar with active-section highlighting, smooth scroll & scroll-progress bar
- Full animated mobile menu
- Hero with typing animation and a CSS-built glass terminal card
- Scroll-reveal animations via `IntersectionObserver`
- Interactive, filterable project grid with a details modal (GitHub / Live Demo / View Details)
- Animated education & journey timelines
- Animated stat counters (trigger on viewport entry)
- Certification cards with a certificate modal
- Dark/Light theme toggle, persisted via `localStorage`
- Contact form with client-side validation and FormSubmit integration
- Fully responsive from 320px to 1920px+, no horizontal scroll
- Semantic HTML, ARIA labels, visible focus states, keyboard-accessible modals (Esc / outside click / close button)
- `robots.txt` and `sitemap.xml` included for basic SEO — update the domain inside both once deployed

---

## 🛠️ Tech

HTML5 · CSS3 (custom properties, Grid, Flexbox) · Vanilla JavaScript (ES6+) · Google Fonts (Inter, Poppins, JetBrains Mono) · Font Awesome (CDN icons)

---

© 2026 Aakash Barasiya. All Rights Reserved.

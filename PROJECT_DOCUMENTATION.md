# Noman Maintenance Services Company — Website Documentation

Complete reference for the static marketing website in this repository. Company: **Noman Maintenance Services Company** (Arabic: شركة نومان مينتينانس سيرفيسز), CR Number **7032690815**, based in Saudi Arabia (Jubail & Riyadh).

---

## 1. What this project is

A static (no backend, no build step) multi-page HTML/CSS/JS marketing/brochure website for an industrial & infrastructure services contractor. It presents the company's services, engineering "solutions" products, projects, certificates, and contact details. There is no CMS, database, server-side code, or client-side framework — every page is hand-written HTML that repeats a shared header/footer.

The live site is deployed on **Vercel** and version-controlled in a **separate Git repository nested inside this folder** (`website/`).

---

## 2. Folder structure

```
soc/                                    ← top-level folder (NOT a git repo itself)
├── logo.jpeg                           ← loose copy of the company logo
├── Our Projects – Harisco Saudi/       ← raw reference images (see §12)
│   ├── image.svg, image (1-4).svg      ← client-logo SVGs
│   ├── Picture7.jpg
│   ├── WhatsApp-Image-2025-08-30-*.jpeg
│   ├── WhatsApp-Image-2025-09-04-*.jpeg (x2)
│   └── world_map_png_6_1.webp
├── website screenshots/                ← 15 FireShot PNG screenshots of
│                                          hariscosaudi.com pages, used as a
│                                          visual reference while building this site
└── website/                            ← THE ACTUAL WEBSITE (git repo, deployed)
    ├── index.html                      ← Home
    ├── about-us.html
    ├── contact.html
    ├── projects.html                   ← placeholder page
    ├── certificates.html               ← placeholder page
    ├── epc-lstk.html                   ─┐
    ├── engineering-design.html          │ "Our Services" pages
    ├── construction-infrastructure.html │
    ├── mechanical-works.html            │
    ├── electrical-instrumentation.html ─┘
    ├── acoustic-pyrometers.html        ─┐
    ├── engineering-simulation.html      │
    ├── industrial-water-treatment.html  │ "Our Solutions" pages
    ├── modular-floating-cover.html      │
    ├── process-heat-transfer.html       │
    ├── venturi-steam-traps.html        ─┘
    ├── old_index.html                  ← superseded draft, unused (see §12)
    ├── css/style.css                   ← single global stylesheet
    ├── js/main.js                      ← single global script
    ├── assets/                         ← images/logo used by the pages
    ├── vercel.json                     ← deployment config
    ├── fix_encoding.py / fix_encoding.js  ← one-off dev scripts (see §12)
    └── update.js                       ← one-off dev script (see §12)
```

`website/` is its own Git repository (the `soc/` root is not), with the remote `origin` pointing to a GitHub repo named **`Noman-Maintenance`** under account `alfkim92-bit`.

> ⚠️ **Security note:** `website/.git/config` currently stores the `origin` remote URL with a **GitHub Personal Access Token embedded in plain text** (`https://<user>:<token>@github.com/...`). Anyone with read access to this machine/folder can read that token. Recommended fix: rotate/revoke that token in GitHub → Settings → Developer settings, then reconfigure the remote to use `https://github.com/alfkim92-bit/Noman-Maintenance.git` plus Git Credential Manager (or an SSH key) instead of embedding the token in the URL.

---

## 3. Tech stack

| Layer | Technology |
|---|---|
| Markup | Static HTML5, one file per page, no templating engine |
| Styling | Single hand-written stylesheet, [css/style.css](css/style.css) (947 lines), CSS custom properties, CSS Grid/Flexbox, no Sass/PostCSS/Tailwind |
| Behavior | Vanilla JS, [js/main.js](js/main.js) (107 lines) — no framework (no React/Vue), no bundler, no npm build |
| Fonts | Google Fonts — **Inter** (weights 300–800), loaded via `<link>` |
| Icons | **Font Awesome 6.4.0** via cdnjs |
| Carousel lib | **Swiper 11** via jsDelivr — loaded only on `index.html`, currently **not actually used** (see §13) |
| Hosting | **Vercel** (static hosting), config in [vercel.json](vercel.json) |
| Version control | Git, remote on GitHub (`alfkim92-bit/Noman-Maintenance`) |

There is no `package.json`, no dependency manager, and no build/test tooling — the site is deployed as-is.

### `vercel.json`
```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```
- `cleanUrls: true` — Vercel serves `/about-us` without needing the `.html` extension (and internal links using `.html` still work).
- `trailingSlash: false` — URLs are normalized to not end in `/`.

---

## 4. Site map & navigation

Every page shares the same header navigation (a `<nav class="nav-links">` inside `<header class="navbar">`) and footer. The nav has two hover-dropdowns:

| Nav item | Type | Target |
|---|---|---|
| Home | link | [index.html](index.html) |
| **Our Services** ▾ | dropdown | — |
| &nbsp;&nbsp;↳ EPC/LSTK Project | link | [epc-lstk.html](epc-lstk.html) |
| &nbsp;&nbsp;↳ Engineering & Design | link | [engineering-design.html](engineering-design.html) |
| &nbsp;&nbsp;↳ Construction & Infrastructure | link | [construction-infrastructure.html](construction-infrastructure.html) |
| &nbsp;&nbsp;↳ Mechanical Works | link | [mechanical-works.html](mechanical-works.html) |
| &nbsp;&nbsp;↳ Electrical & Instrumentation | link | [electrical-instrumentation.html](electrical-instrumentation.html) |
| **Our Solutions** ▾ | dropdown | — |
| &nbsp;&nbsp;↳ Acoustic Pyrometers | link | [acoustic-pyrometers.html](acoustic-pyrometers.html) |
| &nbsp;&nbsp;↳ Engineering Simulation Solutions | link | [engineering-simulation.html](engineering-simulation.html) |
| &nbsp;&nbsp;↳ Industrial Water Treatment Solutions | link | [industrial-water-treatment.html](industrial-water-treatment.html) |
| &nbsp;&nbsp;↳ Modular Floating Cover | link | [modular-floating-cover.html](modular-floating-cover.html) |
| &nbsp;&nbsp;↳ Process Heat Transfer Solutions | link | [process-heat-transfer.html](process-heat-transfer.html) |
| &nbsp;&nbsp;↳ Venturi Steam Traps | link | [venturi-steam-traps.html](venturi-steam-traps.html) |
| Our Projects | link | [projects.html](projects.html) |
| Our Certificates | link | [certificates.html](certificates.html) |
| About Us | link | [about-us.html](about-us.html) |
| **Contact Us** button | link (CTA) | [contact.html](contact.html) |

On screens ≤768px the nav links and the Contact button are hidden and replaced by a hamburger (`.menu-toggle`) that toggles a `.nav-links.active` vertical dropdown (handled in `main.js`).

---

## 5. Global layout (present on every page)

### Header / Navbar
- Fixed to the top (`position: fixed`), semi-transparent white with `backdrop-filter: blur(10px)`.
- Left: logo image (`assets/logo.jpeg`) + company name in English and Arabic + CR number.
- Center: nav links described above.
- Right: "Contact Us" pill button with a pulsing box-shadow animation, plus a mobile hamburger icon.
- Gets a `.scrolled` class (added by `main.js`) once the page scrolls past 50px, which shrinks the navbar height (90px → 70px) and the logo size.

### Footer
Four columns:
1. **Brand** — logo, name (EN/AR), one-line tagline.
2. **Quick Links** — Home / Services / Solutions / Projects / Certificates / About Us.
3. **Our Services** (or a second "Quick Links" list on the home/placeholder pages) — links to the 4–5 core service pages.
4. **Get In Touch** — address, email (`info@nomanmaintenance.com`), phone, CR number.

Bottom bar: `Copyright © | 2026 | All Rights Reserved.`

**Inconsistency:** on `index.html`, `projects.html`, and `certificates.html` the footer's Quick Links point to `#` (dead links) and the phone number is the placeholder `+966 XX XXX XXXX`. On `about-us.html` and `contact.html` the footer links are wired up correctly and the phone number is the real-looking `+966 535 484852`. See §13.

---

## 6. Design system (from `css/style.css`)

### Colors (CSS custom properties, defined in `:root`)
| Variable | Value | Usage |
|---|---|---|
| `--primary-color` | `#0b3d91` (deep blue) | headings, brand elements, dark backgrounds |
| `--secondary-color` | `#ff7e00` (vibrant orange) | accents, buttons, active states |
| `--secondary-light` | `#ffb13b` | "feature card" backgrounds, secondary accents |
| `--dark-color` | `#1a1a24` | footer background, dark headings |
| `--light-color` | `#ffffff` | cards, light backgrounds |
| `--gray-light` | `#f5f7fa` | section backgrounds |
| `--text-main` / `--text-muted` | `#333333` / `#666666` | body text |
| `--blue-gradient` | `linear-gradient(135deg, #0b3d91, #1e5ab8)` | dark section backgrounds, icon boxes |
| `--orange-gradient` | `linear-gradient(135deg, #ff7e00, #ffa500)` | primary buttons, underline accents |

### Typography
- Font: **Inter** (Google Fonts), weights 300/400/500/600/700/800.
- Section titles: 2.5rem/800 weight, with a small orange gradient underline (`::after`).
- Hero title: 4.5rem/800 on the home page hero, 4rem on inner-page heroes.

### Reusable building blocks (class names)
- `.container` — max-width 1280px content wrapper.
- `.section-padding` — 100px vertical padding for full-bleed sections.
- `.btn.btn-primary` — orange-gradient pill button with a `pulse-shadow` keyframe animation.
- `.project-card`, `.solution-card`, `.feature-card` — white cards with hover lift (`translateY`) and shadow growth.
- `.page-layout-grid` — 2.5fr/1fr grid used by inner "Services" pages (main content + sidebar).
- `.sidebar-menu` / `.sidebar-link` — the right-hand sibling-page navigator on Services pages.
- `.achievements-grid` / `.stat-box` — stats band (image collage + numbered stat boxes).
- `.content-list` / `fa-check-circle` lists — bulleted feature lists (two different bullet styles are used — see §10).

### Animations
- `.slide-in-left / -right / -bottom` start elements translated + transparent; a `.visible` class (added via JS `IntersectionObserver`) animates them into place (`opacity: 1`, `transform: translate(0,0)`) — this is the site's scroll-reveal effect, applied to nearly every section.
- `@keyframes float` — unused-looking gentle up/down float (class `.floating` exists in CSS but isn't applied to any element in the current pages).
- `@keyframes pulse-shadow` — applied to `.btn-primary` (all primary buttons pulse continuously).

### Responsive breakpoints
- `@media (max-width: 1024px)`: grids collapse from 3/2 columns to 2 or 1; footer grid becomes 2 columns.
- `@media (max-width: 768px)`: hero title shrinks to 3rem, all grids become single-column, nav links are replaced by the hamburger menu.

---

## 7. JavaScript behavior (`js/main.js`)

Loaded on every page, wrapped in a single `DOMContentLoaded` listener:

1. **Navbar scroll effect** — adds/removes `.scrolled` on `.navbar` based on `window.scrollY > 50`.
2. **Mobile menu toggle** — clicking `.menu-toggle` toggles `.nav-links.active` and swaps the icon between `fa-bars` and `fa-times`.
3. **Scroll-reveal (`IntersectionObserver`)** — watches every `.slide-in-left/-right/-bottom`, `.stat-box`, `.feature-card`, `.project-card`, `.solution-card`, and gallery image; when an element enters the viewport it gets the `.visible` class (triggering the CSS transition) and is then unobserved (animates once).
4. **Animated number counters** — when a `.stat-box` becomes visible, its `<h3>` text (e.g. `"90M+"`) is parsed into a number + suffix, then counted up from 0 to the target over 2 seconds using `requestAnimationFrame` (`animateValue`).
5. Staggers transition delays for cards/stat-boxes based on their index, so grids animate in a cascading fashion rather than all at once.

`contact.html` additionally defines an **inline** `handleSubmit(event)` function (not in `main.js`) — see §10.3.

---

## 8. Page-by-page content

### 8.1 Home — [index.html](index.html)
- **Hero**: full-viewport background image (`assets/WhatsApp-Image-2025-08-30-at-13-47-35.jpeg`) with a dark-blue gradient overlay, headline **"INDUSTRIAL SOLUTIONS"**, subtitle "Noman Maintenance Services Company", and a CR-number line (currently garbled — see §13).
- **Our Projects** (3-card grid): "Complete Erection Of Steam Turbine And Generator", "Electrical, Instrumentation, And Control System Works For New Power Plant", "Supply & Installation Of Ducts And NEDERMAN Arms & Grinding Machine Connection".
- **Innovative Solutions We Offer** (6-card grid, numbered 01–06): Modular Floating Covers, Industrial Water Treatment Systems, Process Heat Transfer Smart Solutions, Acoustic Pyrometers Solutions, Engineering Simulation Solutions, Venturi Steam Traps. Each card's "READ MORE" link currently points to `#` (not to the corresponding solution page).
- **Why Choose Us**: 3 feature cards — Expert Team, Personalized Approach, Timely And Reliable.
- Loads Swiper.js and initializes two carousels (`.hero-swiper`, `.projects-swiper`) that don't exist in this page's markup — dead code (§13).

### 8.2 About Us — [about-us.html](about-us.html)
The most fleshed-out page (620 lines, own `<style>` block for page-specific CSS). Sections, top to bottom:
1. **About hero** — image collage + "Your Trusted Partner For Industrial & Infrastructure Projects, Services & Solutions", a "VISION 2030 ALIGNED" badge, two intro paragraphs, Contact CTA.
2. **Our Global Clients** — 5 grayscale SVG logos (`assets/image.svg`, `image (1-4).svg`) that colorize on hover.
3. **Vision 2030 banner** — bilingual (Arabic/English) call-out about alignment with Saudi Vision 2030.
4. **Achievements**: stat boxes — **90M+** Man Hours, **24+** Projects Completed, **5+** Ongoing Projects, **3+** Mega Projects.
5. **Why Choose Us** — same 3 feature cards as the home page, styled as "why-card".
6. **Our Global Reach** — office locations: **Saudi Arabia** (Jubail & Riyadh), **UAE** (Dubai), **Bahrain** (Manama).
7. **Building Trust** banner — repeats the 24+ / 90M+ stats with photos.
8. Standard footer (with working links — see §5).

### 8.3 Contact Us — [contact.html](contact.html)
- **Left column**: heading "Start Your Journey With Us" + a contact form (First/Last name, Email, Phone, a "Service of Interest" `<select>` listing the 5 core services + "Industrial Solutions", Message textarea, Submit button).
  - **The form has no backend.** `onsubmit="handleSubmit(event)"` (defined inline at the bottom of the file) just calls `preventDefault()`, changes the button text to "✓ Message Sent!" for 3 seconds, then resets the form. **No email is sent and no data is stored anywhere.**
- **Right column**: three info cards —
  - **Location**: "HARISCO SAUDI LTD 3095, 3090, King Fahd Industrial Area, Al Jubail 35512, Saudi Arabia" — ⚠️ this is leftover text from a different company (see §13), not Noman Maintenance's own address.
  - **Phone**: `+966 535 484852`, with hours "Sunday to Thursday 9:30 AM–5:30 PM… Saturday 09:00 AM–3:00 PM".
  - **Email**: `info@nomanmaintenance.com`.
- **Map section**: an embedded Google Maps `<iframe>` — the embed URL looks hand-constructed/placeholder (arbitrary coordinates and a fake `4v1234567890` cache-busting parameter), so it may not point at the real office location.
- **Our Global Reach** + **Building Trust** sections, duplicated from About Us.

### 8.4 "Our Services" pages (shared template)
All five share one layout: inner hero ("OUR CORE CAPABILITIES") → two-column body (bulleted service description + a right-hand sidebar linking to the other 4 service pages) → achievements stat band (90M+ / 24+ / 5+ / 3+) → "Why Choose Us" → footer.

| Page | `<h2 class="page-title">` | Bulleted scope |
|---|---|---|
| [epc-lstk.html](epc-lstk.html) | EPC/LSTK Project Services | Project Initiation & Scope Management · Engineering Design & Optimization · Procurement/Sourcing/Supply Chain · Construction & On-site Execution · Supply Chain Coordination · Project Integrated Controls Management · QA/QC · HSE Compliance · Testing, Commissioning & Handover |
| [engineering-design.html](engineering-design.html) | Engineering & Consultancy Services | Basic & Detailed Engineering · Project Feasibility Studies · FEED · As-built Packages · Technical Due Diligence · Procurement & Contracting Support · Consultancy Services · Site Supervision |
| [construction-infrastructure.html](construction-infrastructure.html) | Industrial Civil & Construction Service | Building/Equipment Foundations/Pipe Racks · Duct Banks & Cable Trenching · Camera Poles & Security Barriers · Fence Civil Works · Temporary Construction/Residential Facilities · Recreational Facilities · Surveying/Earthwork/Infrastructure · Architectural Finish & Warehousing · Road Pavement & Landscaping · Pre-Structure Building |
| [mechanical-works.html](mechanical-works.html) | Mechanical Services | Stationary & Rotary Equipment Install/Dismantle · Installation, Dismantling & Replacements · Pipe Fabrication & Installation · Storage Tank Design/Fabrication/Installation · Welding (Aluminum, Copper & Alloys) · Insulation & Surface Protection · In-Plant Replacements |
| [electrical-instrumentation.html](electrical-instrumentation.html) | Electrical & Instrumentation Services | HV/MV/LV Switchgear · GIS · Power/Main Distribution Boards · Transformers & Bus Ducts · Power Factor Correction/UPS/Battery Backup · Earthing & Lightning Protection · Motors/Cable Termination/Splicing · Electrical Maintenance & Renewable Energy · Indoor/Outdoor Lighting · Power Distribution Networks · DCS/PLC/ESD Automation · SCADA Integration · Process Instrumentation & Vibration Monitoring · Control Valves/Switches/Sensors · Instrument Panels/Cabinets/Racks · Control System Revamping · Metering & Analytical Shelters · Analyzer Install & Calibration · Hook-up/Terminations/Loop Checks · Control & Safety Relief Valve Services |

### 8.5 "Our Solutions" pages (shared template)
All six share a different layout: inner hero ("INDUSTRIAL SOLUTIONS") → two-column body (heading + `fa-check-circle` bullet list on the left, a photo in a rounded yellow panel on the right) → the same achievements stat band → "Why Choose Us" → footer. These pages have **no sidebar** (unlike the Services pages) and are not cross-linked to each other.

| Page | Heading | Bulleted highlights |
|---|---|---|
| [acoustic-pyrometers.html](acoustic-pyrometers.html) | Acoustic Pyrometers | Boiler Gas Temperature Profile · Used for Boiler Tube Leak Detection |
| [modular-floating-cover.html](modular-floating-cover.html) | Modular Floating Covers | For Surge Ponds/Lagoons/Open Tanks · Covers 99% of surface · Odor/VOC/Evaporation Reduction · Algae Control · 10-Year Warranty, life up to 20 years |
| [process-heat-transfer.html](process-heat-transfer.html) | Process Heat Transfer Solutions | Hot Oil & Water Temp Control · Central & Portable Chillers · Natural Refrigerant Chillers · Cooling Tower & Tank Systems · Mixer Systems · Glycol Feed Systems · Bio-Waste Decomposition · Pump Heat Exchanger Package · Steam Sampling Systems |
| [engineering-simulation.html](engineering-simulation.html) | Engineering Simulation Solutions | Holistic Engineering V&V Platform · Controls System Design & V&V · Human Factors Engineering Platform · Develop/Validate Operating Procedures · Training on Upset Conditions · TA & Startup Experience · Real-world/Transient Training · Plant Logic Testing · Equipment Impact Simulation · Plant Operations Training |
| [industrial-water-treatment.html](industrial-water-treatment.html) | Industrial Water Treatment Solutions | MBR & MBBR Plants · Reverse Osmosis · Ultra Filtration · Degasser Units · Micro Filtration · Rainwater Harvesting · Odor Control · Chemical Injection & Dosing Pumps · Gas Chlorination · Containerized Water Plants |
| [venturi-steam-traps.html](venturi-steam-traps.html) | Venturi Steam Traps | 20-Year Warranty · 1–2 Year ROI · 20–30% Steam Energy Reduction · 10–30% Steam Cost Reduction · CO₂ Emission Reduction · Lower Make-up Water Expense · Reduced Water Hammering |

### 8.6 Our Projects — [projects.html](projects.html)
**Placeholder page.** Hero says "Our Projects"; body is literally a dashed-border box reading *"Content Placeholder"* with the text "Detailed information about Our Projects will be provided here." Despite being a top-level nav item, no real project portfolio exists here yet (the only real project mentions live on the Home page's 3-card grid).

### 8.7 Our Certificates — [certificates.html](certificates.html)
**Placeholder page**, identical structure to Projects — "Content Placeholder" box, no certificates/images actually shown.

---

## 9. Assets inventory (`website/assets/`)

| File | Size | Used for |
|---|---|---|
| `logo.jpeg` | 112 KB | Navbar + footer logo (all pages) |
| `WhatsApp-Image-2025-08-30-at-13-47-35.jpeg` | 209 KB | Hero background (home + all inner-page heroes), "Project 1", achievement photos |
| `WhatsApp-Image-2025-09-04-at-10-30-26.jpeg` | 232 KB | "Project 2", achievement/trust photos |
| `WhatsApp-Image-2025-09-04-at-10-30-46.jpeg` | 171 KB | "Project 3" |
| `Picture7.jpg` | 13 KB | About Us secondary image |
| `world_map_png_6_1.webp` | 67 KB | Vision 2030 / Global Reach map graphic |
| `image.svg`, `image (1).svg` … `image (4).svg` | <1 KB each | "Our Global Clients" logo row (About Us + the reverted homepage variant) |

Note: the same 3 WhatsApp photos are reused across nearly every page (hero backgrounds, "achievements" collages, project cards) — there is no per-project or per-service photography yet.

---

## 10. Legacy / utility files (not part of the live site)

These exist in the repo but are **not linked from any page** and are not needed for the site to run — they were one-off local scripts used while building the content, kept around as history:

- **`old_index.html`** — an earlier draft of the homepage (dead `#` nav links, more severely mis-encoded Arabic text). Superseded by `index.html`.
- **`fix_encoding.py`** / **`fix_encoding.js`** — tiny standalone scripts (Python and Node versions of the same fix) that search all `*.html` files for one specific mis-encoded Arabic byte sequence and replace it with the correct string `شركة نومان مينتينانس سيرفيسز`. Only fixed *that one substring* — several files still have other encoding corruption (see §13).
- **`update.js`** — a Node script that once rewrote `index.html` wholesale, injecting a Swiper-based hero slider, a "Global Clients" strip, a Vision 2030 banner, an achievements band, a "Core Capabilities" grid, an "Innovative Solutions" grid, a projects carousel, and a "Global Reach" section. Per the git history this was later **reverted** back to the simpler layout, but the leftover Swiper `<link>`/`<script>` tags in `index.html` were not cleaned up (§13).

None of these three scripts are referenced by any HTML page and none run automatically; they'd need to be invoked manually (`python fix_encoding.py` / `node fix_encoding.js` / `node update.js`) from inside `website/`.

---

## 11. Known issues / inconsistencies

1. **Mis-encoded Arabic text (mojibake)** — the Arabic company name and CR line were saved/re-saved with mismatched text encodings at some point. Current state:
   - `index.html`, `about-us.html`, `contact.html`, and the 11 service/solution pages display the Arabic correctly (`شركة نومان مينتينانس سيرفيسز`) **except** that `index.html`'s hero subtitle (`.hero-cr`) and `old_index.html` still show raw corrupted bytes (`╪┤╪▒┘â╪⌐ ┘å┘ê┘à╪º┘å...`).
   - `certificates.html` and `projects.html` still show a *different* mojibake pattern (`Ø´Ø±ÙƒØ© Ù†ÙˆÙ…Ø§Ù†...`) in both the `<title>` and the footer logo text, and their footer copyright line is `Copyright Â© | 2026` (a mis-encoded `©`).
   - Root cause: files were saved with inconsistent encodings and `fix_encoding.{py,js}` only patched one exact byte sequence, which doesn't match every corrupted variant present.
2. **Leftover "Harisco Saudi" branding** — `contact.html`'s "Location" card reads *"HARISCO SAUDI LTD 3095, 3090, King Fahd Industrial Area, Al Jubail 35512, Saudi Arabia"*, which is a different company's name/address left over from whatever template/reference this site was built from (see the `Our Projects – Harisco Saudi/` reference folder and the `hariscosaudi.com` screenshots at the repo root). This should be replaced with Noman Maintenance's real address.
3. **Placeholder/fake data:**
   - `index.html`, `projects.html`, `certificates.html` footers show phone `+966 XX XXX XXXX` (never filled in), while `about-us.html`/`contact.html` show `+966 535 484852`.
   - The Google Maps `<iframe>` on `contact.html` uses an embed URL with placeholder-looking parameters and may not point to the real office.
   - The contact form has no backend integration — submissions are not sent or saved anywhere; it only simulates success in the UI.
4. **Dead/incomplete pages** — `projects.html` and `certificates.html` are both un-built placeholders ("Content Placeholder"), despite being primary nav items.
5. **Dead code** — `index.html` loads the Swiper carousel library and initializes `.hero-swiper`/`.projects-swiper` instances, but no elements with those classes exist on the page (that markup was removed when `update.js`'s changes were reverted per git history). The library download is wasted and the init script is a no-op.
6. **Dead links** — the "READ MORE" links under each solution card on the homepage point to `#` instead of the matching solution page; several footers (`index.html`, `projects.html`, `certificates.html`) have Quick-Links pointing to `#`.
7. **No favicon** — none of the pages declare a `<link rel="icon">`.
8. **Duplicated top-level files** — `soc/logo.jpeg` and the `Our Projects – Harisco Saudi/` images are duplicates of files already inside `website/assets/`; they aren't part of the deployed site.
9. **Exposed credential** — see the security note in §2 (GitHub PAT embedded in `website/.git/config`'s remote URL).

---

## 12. Version control & hosting

- `website/` is a Git repository with 10 commits on `main`, from `Initial commit: Noman Maintenance Services Company homepage` through `Add full About Us & Contact pages with all sections and animations matching design screenshots`.
- Remote: `origin` → `github.com/alfkim92-bit/Noman-Maintenance` (HTTPS).
- Deployment target: **Vercel**, configured purely through [vercel.json](vercel.json) (clean URLs, no trailing slash) — no `api/` functions, no environment variables, no build command (static files served as-is).

---

## 13. Suggested next steps (not yet done)

- Re-save `certificates.html`, `projects.html`, and `index.html`'s hero markup in consistent UTF-8 to fully fix the remaining mojibake.
- Replace the Harisco Saudi address on `contact.html` with the real Noman Maintenance address, and fill in the real phone number everywhere (home/projects/certificates footers).
- Build out real content for `projects.html` (a proper project portfolio/gallery) and `certificates.html` (actual certificate images/PDFs).
- Wire the contact form to a real endpoint (e.g., an email API or a form service) so submissions actually reach someone.
- Replace the placeholder Google Maps embed with the real office's embed link.
- Either remove the unused Swiper `<link>`/`<script>` tags from `index.html`, or actually build the slider markup they're meant to control.
- Fix the homepage's solution-card "READ MORE" links to point at their real solution pages, and fix `#`-only footer links.
- Rotate the exposed GitHub token and stop storing credentials directly in the git remote URL.

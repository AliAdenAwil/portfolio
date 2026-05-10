# Ali Awil — portfolio site

This repository is the source for my personal portfolio: a static site (HTML, CSS, Bootstrap) deployed on Netlify.

**Live site:** [https://aliawil.netlify.app/](https://aliawil.netlify.app/)


---

What you’ll find on the site: about me, experience, education, projects, and contact.

---

## Maintainer notes (optional)

If I’m editing or testing this repo locally:

```bash
npm install
npm run install:browsers
npm run serve
```

Dependencies install only under **`node_modules/`** in this repo (no global npm packages). Playwright browser binaries go under **`.cache/ms-playwright/`** (gitignored), not your home directory.

Then open `http://localhost:3000`. A full checkout should include **`resume.pdf`** and **`images/`** so the hero, downloads, and tests behave like production.

To regenerate the PDF after editing **`resume-src.html`**:

```bash
npm run resume:pdf
```

```bash
npm test
```

Playwright checks navigation, key content, external links, static SEO files (`llms.txt`, `robots.txt`, `sitemap.xml`), and JSON-LD.

**Custom domain:** If I later add a primary domain in Netlify, update absolute URLs consistently in **`index.html`**, **`robots.txt`**, **`sitemap.xml`**, **`llms.txt`**, and social/meta tags so they match the canonical host.

A **`Dockerfile`** is present for CI-style test runs; the live site is static files on Netlify, not a Docker container.

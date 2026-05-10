const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// ─── Skip link & main landmark ──────────────────────────────────────────────

test.describe('Accessibility basics', () => {
  test('skip link targets main content', async ({ page }) => {
    await expect(page.locator('a.skip-link')).toHaveAttribute('href', '#main-content');
    await expect(page.locator('main#main-content')).toBeVisible();
  });
});

// ─── Navigation ───────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  // On mobile the nav is collapsed behind a hamburger — open it first if needed.
  async function openNavIfCollapsed(page) {
    const toggler = page.locator('.navbar-toggler');
    if (await toggler.isVisible()) {
      await toggler.click();
      await page.locator('#navbarNav').waitFor({ state: 'visible' });
    }
  }

  test('navbar brand shows name', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('Ali Awil');
  });

  test('navbar has links to all primary sections', async ({ page }) => {
    await openNavIfCollapsed(page);
    for (const label of ['About', 'Skills', 'Experience', 'Education', 'Projects', 'Contact']) {
      await expect(page.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
  });

  test('About link scrolls to about section', async ({ page }) => {
    await openNavIfCollapsed(page);
    await page.getByRole('link', { name: 'About', exact: true }).click();
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('Projects link scrolls to projects section', async ({ page }) => {
    await openNavIfCollapsed(page);
    await page.getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('Education link scrolls to education section', async ({ page }) => {
    await openNavIfCollapsed(page);
    await page.getByRole('link', { name: 'Education', exact: true }).click();
    await expect(page.locator('#education')).toBeInViewport();
  });
});

// ─── Hero Section ─────────────────────────────────────────────────────────────

test.describe('Hero Section', () => {
  test('displays full name', async ({ page }) => {
    await expect(page.locator('.hero-name')).toHaveText('Ali Awil');
  });

  test('displays professional title', async ({ page }) => {
    await expect(page.locator('.hero-title')).toContainText('AI Researcher');
    await expect(page.locator('.hero-title')).toContainText('Software Engineer');
  });

  test('highlights Summa Cum Laude in bio', async ({ page }) => {
    await expect(page.locator('.hero-bio')).toContainText('Summa Cum Laude');
  });

  test('has View Projects CTA button linking to #projects', async ({ page }) => {
    const btn = page.getByRole('link', { name: 'View Projects' });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', '#projects');
  });

  test('has Download Resume button linking to resume.pdf', async ({ page }) => {
    const btn = page.getByRole('link', { name: 'Download Resume' });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', 'resume.pdf');
  });

  test('profile photo is visible', async ({ page }) => {
    const img = page.locator('.profile-img');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('alt', 'Ali Awil');
  });

  test('social links are present', async ({ page }) => {
    await expect(page.locator('.social-icons a[href*="linkedin"]')).toBeVisible();
    await expect(page.locator('.social-icons a[href*="github"]')).toBeVisible();
    await expect(page.locator('.social-icons a[href*="mailto"]')).toBeVisible();
  });
});

// ─── Skills Section ───────────────────────────────────────────────────────────

test.describe('Skills Section', () => {
  test('skills section exists', async ({ page }) => {
    await expect(page.locator('#skills')).toBeVisible();
  });

  test('has exactly three skill categories', async ({ page }) => {
    await expect(page.locator('#skills .skill-group')).toHaveCount(3);
  });

  test('lists core languages', async ({ page }) => {
    for (const skill of ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'R']) {
      await expect(page.locator('#skills').getByText(skill, { exact: true })).toBeVisible();
    }
  });

  test('lists key ML/AI frameworks', async ({ page }) => {
    for (const skill of ['PyTorch', 'Hugging Face', 'LangChain', 'Scikit-learn']) {
      await expect(page.locator('#skills').getByText(skill, { exact: true })).toBeVisible();
    }
  });

  test('lists key concepts', async ({ page }) => {
    for (const concept of ['Machine Learning', 'RAG', 'Deep Learning', 'NLP']) {
      await expect(page.locator('#skills').getByText(concept, { exact: true })).toBeVisible();
    }
  });
});

// ─── Experience Section ───────────────────────────────────────────────────────

test.describe('Experience Section', () => {
  test('experience section exists', async ({ page }) => {
    await expect(page.locator('#experience')).toBeVisible();
  });

  test('has exactly three timeline entries', async ({ page }) => {
    await expect(page.locator('.timeline-item')).toHaveCount(3);
  });

  test('shows all three employers', async ({ page }) => {
    for (const company of ['University of Ottawa', 'Department of National Defence', 'Zafin']) {
      await expect(page.locator('.timeline-company', { hasText: company })).toBeVisible();
    }
  });

  test('shows all three roles', async ({ page }) => {
    for (const role of ['Teaching Assistant', 'Data Science Developer Intern', 'Software Engineer Intern']) {
      await expect(page.locator('.timeline-role', { hasText: role })).toBeVisible();
    }
  });

  test('DND entry highlights key metrics', async ({ page }) => {
    const dnd = page.locator('.timeline-item').filter({ hasText: 'National Defence' });
    await expect(dnd).toContainText('23% faster inference');
    await expect(dnd).toContainText('89% accuracy');
  });

  test('Zafin entry highlights key metrics', async ({ page }) => {
    const zafin = page.locator('.timeline-item').filter({ hasText: 'Zafin' });
    await expect(zafin).toContainText('90% accuracy');
    await expect(zafin).toContainText('10K+');
  });
});

// ─── Education Section ────────────────────────────────────────────────────────

test.describe('Education Section', () => {
  test('education section has anchor id', async ({ page }) => {
    await expect(page.locator('#education')).toBeVisible();
  });

  test('has exactly two education cards', async ({ page }) => {
    await expect(page.locator('.edu-card')).toHaveCount(2);
  });

  test('shows MSc degree', async ({ page }) => {
    const msc = page.locator('#education').locator('.edu-card').filter({ hasText: 'Master of Computer Science' });
    await expect(msc).toBeVisible();
    await expect(msc.getByText('Applied Artificial Intelligence', { exact: true })).toBeVisible();
  });

  test('shows BSc degree', async ({ page }) => {
    await expect(page.locator('text=BSc Computer Science')).toBeVisible();
  });

  test('shows Summa Cum Laude', async ({ page }) => {
    await expect(page.locator('.edu-card').filter({ hasText: 'Summa Cum Laude' })).toBeVisible();
  });

  test('shows CGPA', async ({ page }) => {
    await expect(page.locator('.edu-card').filter({ hasText: '9.32' })).toBeVisible();
  });
});

// ─── Projects Section ─────────────────────────────────────────────────────────

test.describe('Projects Section', () => {
  test('projects section exists', async ({ page }) => {
    await expect(page.locator('#projects')).toBeVisible();
  });

  test('has exactly six project cards', async ({ page }) => {
    await expect(page.locator('#projects .project-card')).toHaveCount(6);
  });

  test('shows ML and web project subsections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Machine learning & data' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Web applications' })).toBeVisible();
  });

  test('shows all project titles', async ({ page }) => {
    for (const title of [
      'Voice Assistant Pipeline',
      'Flight Price Prediction',
      'Food Prices BI Dashboard',
      'PedalPro Bike Service',
      'ShopSmart E-Commerce',
      'Simon Says Memory Game',
    ]) {
      await expect(page.locator('#projects .card-title', { hasText: title })).toBeVisible();
    }
  });

  test('AI/ML projects show key metrics', async ({ page }) => {
    await expect(page.locator('#projects').getByText('R² = 0.97')).toBeVisible();
    await expect(page.locator('#projects').getByText('20+ intents')).toBeVisible();
  });

  test('every project card has a CTA button', async ({ page }) => {
    const cards = page.locator('#projects .project-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.btn-purple')).toBeVisible();
    }
  });

  test('live demo links point to correct deployments', async ({ page }) => {
    for (const domain of [
      'huggingface.co/spaces/Aliadenawil/atlas-voice-assistant',
      'github.com/AliAdenAwil/flight-price-prediction',
      'pedalpro-bike-service.netlify.app',
      'shopsmartecommerce.netlify.app',
      'simonsaysgameuottawa.netlify.app',
      'foodpricesdashboard.netlify.app',
    ]) {
      await expect(page.locator(`a[href*="${domain}"]`)).toBeVisible();
    }
  });

  test('AI/ML project cards have category badges', async ({ page }) => {
    await expect(page.locator('.project-badge', { hasText: 'AI / NLP' })).toBeVisible();
    await expect(page.locator('.project-badge', { hasText: 'Machine Learning' })).toBeVisible();
  });
});

// ─── Contact Section ──────────────────────────────────────────────────────────

test.describe('Contact Section', () => {
  test('contact section exists', async ({ page }) => {
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('has Say Hello CTA button', async ({ page }) => {
    const btn = page.getByRole('link', { name: 'Say Hello' });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', 'mailto:aliadenawil1955@gmail.com');
  });

  test('shows correct email address', async ({ page }) => {
    await expect(
      page.locator('#contact a[href="mailto:aliadenawil1955@gmail.com"]').first()
    ).toBeVisible();
  });

  test('has LinkedIn and GitHub social links', async ({ page }) => {
    await expect(page.locator('#contact a[href*="linkedin"]')).toBeVisible();
    await expect(page.locator('#contact a[href*="github"]')).toBeVisible();
  });
});

// ─── Footer ───────────────────────────────────────────────────────────────────

test.describe('Footer', () => {
  test('shows copyright with current year', async ({ page }) => {
    const year = String(new Date().getFullYear());
    await expect(page.locator('footer')).toContainText(year);
    await expect(page.locator('footer')).toContainText('Ali Awil');
  });
});

// ─── Responsive Design ────────────────────────────────────────────────────────

test.describe('Responsive Design', () => {
  test('mobile: hamburger toggle is visible, nav links are collapsed', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('.navbar-toggler')).toBeVisible();
    await expect(page.locator('#navbarNav')).not.toBeVisible();
  });

  test('mobile: hamburger opens the nav menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.locator('.navbar-toggler').click();
    await expect(page.locator('#navbarNav')).toBeVisible();
  });

  test('desktop: nav links are directly visible', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.locator('#navbarNav')).toBeVisible();
    await expect(page.getByRole('link', { name: 'About', exact: true })).toBeVisible();
  });

  test('mobile: hero section is readable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('.hero-name')).toBeVisible();
    await expect(page.locator('.hero-title')).toBeVisible();
  });
});

// ─── Link Checker ─────────────────────────────────────────────────────────────

// These tests make real HTTP requests to verify every linked URL is reachable.
// LinkedIn (999 anti-bot) and HuggingFace Spaces (iframe auth) are checked for
// non-server-error responses only.
test.describe('Link Checker', () => {
  test.setTimeout(30000);

  test('resume.pdf is served by the local server', async ({ request }) => {
    const res = await request.get('/resume.pdf');
    expect(res.status(), 'resume.pdf not found on server').toBeLessThan(400);
    expect(res.headers()['content-type']).toMatch(/pdf/);
  });

  test('llms.txt is served', async ({ request }) => {
    const res = await request.get('/llms.txt');
    expect(res.status()).toBeLessThan(400);
    const text = await res.text();
    expect(text).toContain('Ali Awil');
    expect(text).toContain('University of Ottawa');
  });

  test('robots.txt is served and references sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBeLessThan(400);
    const text = await res.text();
    expect(text).toMatch(/Sitemap:\s*https:\/\/aliawil\.netlify\.app\/sitemap\.xml/);
  });

  test('sitemap.xml lists canonical homepage', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBeLessThan(400);
    const text = await res.text();
    expect(text).toContain('https://aliawil.netlify.app/');
    expect(text).toContain('urlset');
  });

  test('GitHub profile is reachable', async ({ request }) => {
    const res = await request.get('https://github.com/AliAdenAwil');
    expect(res.status(), 'GitHub profile returned error').toBeLessThan(400);
  });

  test('Voice Assistant HuggingFace Space is reachable', async ({ request }) => {
    const res = await request.get('https://huggingface.co/spaces/Aliadenawil/atlas-voice-assistant');
    expect(res.status(), 'HuggingFace Space returned server error').toBeLessThan(500);
  });

  test('Flight Price Prediction GitHub repo is reachable', async ({ request }) => {
    const res = await request.get('https://github.com/AliAdenAwil/flight-price-prediction');
    expect(res.status(), 'Flight price repo returned error').toBeLessThan(400);
  });

  test('PedalPro Netlify site is reachable', async ({ request }) => {
    const res = await request.get('https://pedalpro-bike-service.netlify.app/');
    expect(res.status(), 'PedalPro site returned error').toBeLessThan(400);
  });

  test('ShopSmart Netlify site is reachable', async ({ request }) => {
    const res = await request.get('https://shopsmartecommerce.netlify.app/');
    expect(res.status(), 'ShopSmart site returned error').toBeLessThan(400);
  });

  test('Simon Says Netlify site is reachable', async ({ request }) => {
    const res = await request.get('https://simonsaysgameuottawa.netlify.app/');
    expect(res.status(), 'Simon Says site returned error').toBeLessThan(400);
  });

  test('Food Prices Dashboard is reachable', async ({ request }) => {
    const res = await request.get('https://foodpricesdashboard.netlify.app/');
    expect(res.status(), 'Food Prices dashboard returned error').toBeLessThan(400);
  });

  test('Zafin Medium article is reachable', async ({ request }) => {
    const res = await request.get('https://medium.com/engineering-zafin/closing-the-gap-between-available-information-and-accessible-knowledge-a-multi-modal-approach-to-d824626bcfe7');
    expect(res.status(), 'Medium article returned error').toBeLessThan(400);
  });

  test('LinkedIn profile is reachable', async ({ request }) => {
    const res = await request.get('https://linkedin.com/in/aliawil');
    // LinkedIn returns 999 for automated requests (anti-bot, not a real error).
    // Anything that is not a 404 or standard 5xx confirms the URL is live.
    const status = res.status();
    expect(status === 999 || status < 400, `LinkedIn returned unexpected status ${status}`).toBe(true);
  });
});

// ─── Content Quality ──────────────────────────────────────────────────────────

test.describe('Content Quality', () => {
  test('no em dashes in page text', async ({ page }) => {
    const bodyText = await page.locator('body').innerHTML();
    const hasEmDash = bodyText.includes('—') || bodyText.includes('&mdash;');
    expect(hasEmDash, 'Found an em dash (— or &mdash;) in the page').toBe(false);
  });
});

// ─── Page Meta ────────────────────────────────────────────────────────────────

test.describe('Page Meta', () => {
  test('page title includes name and role', async ({ page }) => {
    await expect(page).toHaveTitle(/Ali Awil/);
    await expect(page).toHaveTitle(/AI Researcher/);
    await expect(page).toHaveTitle(/MSc Applied AI/);
  });

  test('has viewport meta tag for mobile', async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('has meta description', async ({ page }) => {
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /.+/);
  });

  test('has Open Graph and Twitter image tags', async ({ page }) => {
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /.+/);
  });

  test('JSON-LD is parseable and includes WebSite, Person, and ItemList', async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    expect(raw.trim().length).toBeGreaterThan(0);
    const data = JSON.parse(raw);
    expect(data['@context']).toBe('https://schema.org');
    expect(Array.isArray(data['@graph'])).toBe(true);
    const types = data['@graph'].map((node) => node['@type']);
    expect(types).toContain('WebSite');
    expect(types).toContain('Person');
    expect(types).toContain('ItemList');
  });
});

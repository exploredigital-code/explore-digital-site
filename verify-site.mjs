import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const BASE = 'http://localhost:3002/pt';
const OUT  = 'C:/Users/Nitro V15/Desktop/ExploreDigital/site/screenshots';

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function capture(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log(`📸 ${name}`);
}

// ── DESKTOP (1440×900) ──────────────────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(BASE, { waitUntil: 'load' });
  await capture(page, 'desktop-hero');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.2));
  await page.waitForTimeout(600);
  await capture(page, 'desktop-portfolio');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(600);
  await capture(page, 'desktop-services');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(600);
  await capture(page, 'desktop-about');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(600);
  await capture(page, 'desktop-testimonials');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(600);
  await capture(page, 'desktop-contact');

  // Check for console errors
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.reload({ waitUntil: 'load' });
  console.log('Desktop console errors:', errors.length ? errors : 'none');

  await page.close();
}

// ── MOBILE (390×844 — iPhone 14) ───────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });

  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto(BASE, { waitUntil: 'load' });
  await capture(page, 'mobile-hero');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(500);
  await capture(page, 'mobile-marquee-stats');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.5));
  await page.waitForTimeout(500);
  await capture(page, 'mobile-portfolio');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(500);
  await capture(page, 'mobile-services');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(500);
  await capture(page, 'mobile-about');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 3));
  await page.waitForTimeout(500);
  await capture(page, 'mobile-testimonials-contact');

  // Test mobile menu
  const burger = await page.$('button[aria-label]');
  if (burger) {
    await burger.click();
    await page.waitForTimeout(400);
    await capture(page, 'mobile-menu-open');
  }

  // Navigate to portfolio page
  await page.goto(`${BASE}/portfolio`, { waitUntil: 'load' });
  await capture(page, 'mobile-portfolio-page');

  // Navigate to about page
  await page.goto(`${BASE}/sobre`, { waitUntil: 'load' });
  await capture(page, 'mobile-about-page');

  console.log('Mobile console errors:', errors.length ? errors : 'none');
  await page.close();
}

await browser.close();
console.log('\n✅ Done. Screenshots saved to:', OUT);

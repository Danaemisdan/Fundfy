import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  // We assume the dev server is running on 5173, but we can also just run it
  await page.goto('http://localhost:5173/poster/ai-innovation-contest', { waitUntil: 'networkidle0' });
  
  await browser.close();
})();

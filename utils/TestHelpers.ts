import { Page } from '@playwright/test';

export class TestHelpers {
  
  static async blockAds(page: Page): Promise<void> {
    await page.route('**/*', route => {
      const url = route.request().url();
      if (url.includes('googlesyndication') || 
          url.includes('doubleclick') || 
          url.includes('/ads/')) {
        route.abort();
      } else {
        route.continue();
      }
    });
  }
  
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  }
  
  static async scrollToElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
}
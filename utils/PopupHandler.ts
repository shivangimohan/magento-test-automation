import { Page } from '@playwright/test';
import { Selectors } from '../data/testData';

export class PopupHandler {
  
  static async dismissAllPopups(page: Page): Promise<void> {
    try {
      for (const selector of Selectors.popup.closeButtons) {
        const elements = await page.locator(selector).all();
        for (const element of elements) {
          if (await element.isVisible({ timeout: 1000 })) {
            await element.click();
            await page.waitForTimeout(500);
          }
        }
      }
      
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    } catch (error) {
      // Silently continue
    }
  }
  
  static async handleCookieConsent(page: Page): Promise<void> {
    try {
      for (const selector of Selectors.popup.consentButtons) {
        if (await page.locator(selector).isVisible({ timeout: 2000 })) {
          await page.click(selector);
          await page.waitForTimeout(1000);
          break;
        }
      }
    } catch (error) {
      // Silently continue
    }
  }
}
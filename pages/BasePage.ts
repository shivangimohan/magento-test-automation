import { Page } from '@playwright/test';
import { PopupHandler } from '../utils/PopupHandler';
import { TestHelpers } from '../utils/TestHelpers';

export class BasePage {
  
  constructor(protected page: Page) {}
  
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await TestHelpers.waitForPageLoad(this.page);
    await PopupHandler.dismissAllPopups(this.page);
  }
  
  async getProductCount(): Promise<number> {
    return await this.page.locator('.product-item').count();
  }
}
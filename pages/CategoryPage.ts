import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Selectors } from '../data/testData';
import { TestHelpers } from '../utils/TestHelpers';

export class CategoryPage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }
  
  async applySizeFilter(size: string): Promise<boolean> {
    return await this.applyFilter(
      Selectors.filter.sizeFilter,
      Selectors.filter.sizeOption(size),
      `Size: ${size}`
    );
  }
  
  async applyColorFilter(color: string): Promise<boolean> {
    return await this.applyFilter(
      Selectors.filter.colorFilter,
      Selectors.filter.colorOption(color),
      `Color: ${color}`
    );
  }
  
  async applyActivityFilter(activity: string): Promise<boolean> {
    return await this.applyFilter(
      Selectors.filter.activityFilter,
      Selectors.filter.activityOption(activity),
      `Activity: ${activity}`
    );
  }
  
  private async applyFilter(filterTitle: string, optionSelector: string, filterName: string): Promise<boolean> {
    try {
      console.log(`Applying ${filterName} filter`);
      
      await TestHelpers.scrollToElement(this.page, Selectors.filter.sidebar);
      
      // Expand filter section
      const filterTitleElement = this.page.locator(filterTitle);
      if (await filterTitleElement.isVisible({ timeout: 3000 })) {
        await filterTitleElement.click();
        await this.page.waitForTimeout(2000);
        
        // Select option
        const optionElement = this.page.locator(optionSelector);
        if (await optionElement.isVisible({ timeout: 3000 })) {
          await optionElement.click();
          await this.page.waitForTimeout(3000);
          console.log(`Applied ${filterName} filter`);
          return true;
        }
      }
      
      console.log(`${filterName} filter not found`);
      return false;
    } catch (error) {
      console.log(`${filterName} filter failed: ${error}`);
      return false;
    }
  }
  
  async addFirstProductToCart(): Promise<boolean> {
    try {
      const productCount = await this.getProductCount();
      console.log(`📦 Products available: ${productCount}`);
      
      if (productCount > 0) {
        const firstProduct = this.page.locator(Selectors.product.item).first();
        await firstProduct.hover();
        await this.page.waitForTimeout(1500);
        
        const addToCartButton = firstProduct.locator(Selectors.product.addToCartButton);
        if (await addToCartButton.isVisible({ timeout: 3000 })) {
          await addToCartButton.click();
          await this.page.waitForTimeout(4000);
          console.log('Added product to cart');
          return true;
        }
      }
      
      console.log('No products available or add to cart button not found');
      return false;
    } catch (error) {
      console.log(`Add to cart failed: ${error}`);
      return false;
    }
  }
}
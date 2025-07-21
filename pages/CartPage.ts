import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Selectors, TestData } from '../data/testData';
import { PopupHandler } from '../utils/PopupHandler';

export class CartPage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }
  
  async navigateToCart(): Promise<void> {
    try {
      await PopupHandler.dismissAllPopups(this.page);
      
      for (const selector of Selectors.cart.links) {
        if (await this.page.locator(selector).isVisible({ timeout: 2000 })) {
          await this.page.click(selector);
          await this.page.waitForTimeout(2000);
          console.log(`Navigated to cart using: ${selector}`);
          return;
        }
      }
      
      // Fallback to direct navigation
      await this.page.goto('/checkout/cart/');
    } catch (error) {
      console.log('Cart navigation fallback to direct URL');
      await this.page.goto('/checkout/cart/');
    }
    
    await this.page.waitForLoadState('networkidle');
    await PopupHandler.dismissAllPopups(this.page);
  }
  
  async applyDiscountCode(code: string = TestData.discountCode): Promise<void> {
    try {
      await this.page.waitForTimeout(4000);
      // Expand discount section if needed
      const discountSection = this.page.locator(Selectors.cart.discountSection);
      if (await discountSection.isVisible({ timeout: 3000 })) {
        await discountSection.click();
        await this.page.waitForTimeout(1000);
      }
      
      await PopupHandler.dismissAllPopups(this.page);
      await this.page.fill(Selectors.cart.couponInput, code);
      await this.page.click(Selectors.cart.applyButton);
      await this.page.waitForTimeout(4000);
      console.log(`Applied discount code: ${code}`);
    } catch (error) {
      console.log(`Discount application had issues: ${error}`);
    }
  }
  
  async proceedToCheckout(): Promise<void> {
    try {
      await PopupHandler.dismissAllPopups(this.page);
      
      const checkoutButton = this.page.locator(Selectors.cart.checkoutButton);
      if (await checkoutButton.isVisible({ timeout: 5000 })) {
        await checkoutButton.click();
        await this.page.waitForLoadState('networkidle');
        await PopupHandler.dismissAllPopups(this.page);
        
        // Set shipping country
        const countryDropdown = this.page.locator(Selectors.cart.countryDropdown);
        if (await countryDropdown.isVisible({ timeout: 10000 })) {
          await countryDropdown.selectOption(TestData.shippingCountry);
          await this.page.waitForTimeout(3000);
          console.log(`Set shipping to ${TestData.shippingCountry}`);
        }
      }
    } catch (error) {
      console.log(`Checkout completed with issues: ${error}`);
    }
  }

  async updateQuantity(quantity: number): Promise<void> {
    try {
      if (quantity <= 1) {
        console.log('Quantity is 1 or less, skipping update');
        return;
      }
      
      console.log(`Updating cart quantity to: ${quantity}`);
      
      // Find the quantity input field in cart
      const quantityInput = this.page.locator(Selectors.cart.quantityInput).first();
      
      if (await quantityInput.isVisible({ timeout: 5000 })) {
        // Clear and set new quantity
        await quantityInput.clear();
        await quantityInput.fill(quantity.toString());
        console.log(`Set quantity input to: ${quantity}`);
        
        // Click Update Shopping Cart button
        const updateButton = this.page.locator(Selectors.cart.updateCartButton);
        if (await updateButton.isVisible({ timeout: 3000 })) {
          await updateButton.click();
          await this.page.waitForTimeout(3000); // Wait for cart to update
          console.log('Clicked Update Shopping Cart button');
        } else {
          console.log('Update Shopping Cart button not found');
        }
      } else {
        console.log('Quantity input field not found in cart');
      }
    } catch (error) {
      console.log(`Failed to update quantity: ${error}`);
    }
  }

  // discount verification method 
  async verifyDiscountApplied(): Promise<{applied: boolean, discountAmount?: string, subtotal?: string, orderTotal?: string}> {
    try {
      console.log('Verifying discount application...');
      
      // Wait for page to stabilize after discount application
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      
      // Check if discount row exists 
      const discountRow = this.page.locator(Selectors.cart.discountRow);
      const isDiscountVisible = await discountRow.isVisible({ timeout: 10000 });
      
      if (!isDiscountVisible) {
        console.log('Discount row not found');
        
        // Check for any text containing "discount" (case insensitive)
        const discountText = this.page.locator('text=/discount/i');
        const hasDiscountText = await discountText.isVisible({ timeout: 3000 });
        console.log(`Debug: Has discount text: ${hasDiscountText}`);
        
        return { applied: false };
      }
      
      // Get discount details using more specific selectors
      const discountTitle = await this.page.locator(Selectors.cart.discountTitle).textContent() || '';
      const discountAmount = await this.page.locator(Selectors.cart.discountAmount).textContent() || '';
      const subtotal = await this.page.locator(Selectors.cart.subtotalAmount).textContent() || '';
      const orderTotal = await this.page.locator(Selectors.cart.orderTotalAmount).textContent() || '';
      
      console.log('Discount Details:');
      console.log(`   Title: ${discountTitle}`);
      console.log(`   Discount: ${discountAmount}`);
      console.log(`   Subtotal: ${subtotal}`);
      console.log(`   Order Total: ${orderTotal}`);
      
      return {
        applied: true,
        discountAmount: discountAmount?.trim(),
        subtotal: subtotal?.trim(),
        orderTotal: orderTotal?.trim()
      };
      
    } catch (error) {
      console.log(`Failed to verify discount: ${error}`);
      
      // Additional debug information
      const pageUrl = this.page.url();
      console.log(`Debug: Current page URL: ${pageUrl}`);
      
      return { applied: false };
    }
  }
  
  // shipping cost verification method
  async getShippingCost(): Promise<{price?: string, method?: string, carrier?: string}> {
    try {
      console.log('Getting shipping cost for Netherlands...');
      
      // Wait for shipping table to be visible
      const shippingTable = this.page.locator(Selectors.cart.shippingTable);
      if (!await shippingTable.isVisible({ timeout: 10000 })) {
        console.log('Shipping table not found');
        return {};
      }
      
      // Get shipping details
      const shippingPrice = await this.page.locator(Selectors.cart.shippingPrice).first().textContent();
      
      console.log('Shipping Price for Netherlands:');
      console.log(`   Price: ${shippingPrice}`);
      
      return {
        price: shippingPrice?.trim(),
      };
      
    } catch (error) {
      console.log(`Failed to get shipping cost: ${error}`);
      return {};
    }
  }
}
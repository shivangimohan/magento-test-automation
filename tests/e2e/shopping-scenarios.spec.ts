import { test, expect } from '@playwright/test';
import { CategoryPage } from '../../pages/CategoryPage';
import { CartPage } from '../../pages/CartPage';
import { PopupHandler } from '../../utils/PopupHandler';
import { TestHelpers } from '../../utils/TestHelpers';
import { TestData } from '../../data/testData';

test.describe('Magento E-commerce Shopping Scenarios', () => {
  
  test.beforeEach(async ({ page }) => {
    await TestHelpers.blockAds(page);
    await page.goto('/');
    await PopupHandler.handleCookieConsent(page);
    await PopupHandler.dismissAllPopups(page);
  });

  test('Men Jacket - XS Blue', async ({ page }) => {
    console.log('🧥 Starting Men Jacket scenario...');
    
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);
    
    await categoryPage.navigate(TestData.scenarios.menJacket.url);
    
    const initialCount = await categoryPage.getProductCount();
    console.log(`Initial products: ${initialCount}`);
    
    await categoryPage.applySizeFilter(TestData.scenarios.menJacket.filters.size!);
    await categoryPage.applyColorFilter(TestData.scenarios.menJacket.filters.color!);
    
    const addedToCart = await categoryPage.addFirstProductToCart();
    expect(addedToCart).toBe(true);
    
    await cartPage.navigateToCart();
    await cartPage.applyDiscountCode();
    // discount verification
    const discountVerification = await cartPage.verifyDiscountApplied();
    expect(discountVerification.applied).toBe(true);
    console.log(`Discount verified: ${discountVerification.discountAmount}`);
  
    await cartPage.proceedToCheckout();
  
    // shipping verification
    const shippingInfo = await cartPage.getShippingCost();
    console.log(`Shipping cost for Netherlands: ${shippingInfo.price}`);
  
    console.log('✅ Men Jacket scenario completed with verifications');
  });

  test('Women Tops - XS Blue', async ({ page }) => {
    console.log('Starting Women Tops scenario...');
    
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);
    
    await categoryPage.navigate(TestData.scenarios.womenTops.url);
    
    const initialCount = await categoryPage.getProductCount();
    console.log(`Initial products: ${initialCount}`);
    
    await categoryPage.applySizeFilter(TestData.scenarios.womenTops.filters.size!);
    await categoryPage.applyColorFilter(TestData.scenarios.womenTops.filters.color!);

    const addedToCart = await categoryPage.addFirstProductToCart();
    expect(addedToCart).toBe(true);
    
    await cartPage.navigateToCart();
    await cartPage.updateQuantity(TestData.scenarios.womenTops.quantity);
    await cartPage.applyDiscountCode();
    
    // VERIFY DISCOUNT IS APPLIED
    const discountVerification = await cartPage.verifyDiscountApplied();
    expect(discountVerification.applied).toBe(true);
    expect(discountVerification.discountAmount).toContain('-$'); // Should be negative amount
    console.log(`Discount verified: ${discountVerification.discountAmount}`);
  
    // Proceed to checkout
    await cartPage.proceedToCheckout();
  
    // GET SHIPPING COST FOR NETHERLANDS
    const shippingInfo = await cartPage.getShippingCost();
    expect(shippingInfo.price).toBeDefined();
    console.log(`Shipping cost for Netherlands: ${shippingInfo.price}`);
  
    console.log('Women Tops scenario completed with verifications');
  });

  test('Bags - Yoga Activity', async ({ page }) => {
    console.log('Starting Bags scenario...');
    
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);
    
    await categoryPage.navigate(TestData.scenarios.bags.url);
    
    const initialCount = await categoryPage.getProductCount();
    console.log(`Initial products: ${initialCount}`);
    
    await categoryPage.applyActivityFilter(TestData.scenarios.bags.filters.activity!);
    
    const addedToCart = await categoryPage.addFirstProductToCart();
    expect(addedToCart).toBe(true);
    
    await cartPage.navigateToCart();
    await cartPage.applyDiscountCode();
    await cartPage.proceedToCheckout();
    
    console.log('Bags scenario completed');
  });
});

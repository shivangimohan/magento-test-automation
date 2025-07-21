# Magento Test Automation

A Playwright-based test automation framework for testing e-commerce functionality on the Magento demo site using TypeScript and Page Object Model (POM) pattern.

## Features

- **Page Object Model**: Clean, maintainable test structure
- **Multiple Shopping Scenarios**: Men's jackets, women's tops, and bags
- **Discount Code Testing**: Automated coupon application and verification
- **Shipping Cost Verification**: Netherlands shipping cost validation
- **Popup Handling**: Automatic dismissal of cookies and promotional popups
- **Filter Testing**: Size, color, and activity filters
- **Cart Management**: Quantity updates and checkout flow

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Test Scenarios

### 1. Men's Jacket (XS, Blue)
- Navigates to men's jackets category
- Applies size and color filters
- Adds product to cart
- Applies discount code and verifies
- Proceeds to checkout with Netherlands shipping

### 2. Women's Tops (XS, Blue, Quantity: 2)
- Navigates to women's tops category
- Applies filters and adds product
- Updates quantity to 2 items
- Applies discount and verifies savings
- Checks Netherlands shipping cost

### 3. Bags (Yoga Activity)
- Navigates to bags category
- Filters by Yoga activity
- Adds product to cart
- Applies discount code
- Completes checkout flow

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI mode
npm run test:ui

# Show test report
npm run report
```

## Project Structure

```
├── data/
│   └── testData.ts          # Test data and selectors
├── pages/
│   ├── BasePage.ts          # Base page class
│   ├── CategoryPage.ts      # Product category pages
│   └── CartPage.ts          # Shopping cart functionality
├── tests/
│   └── shopping-scenarios.spec.ts  # Main test scenarios
├── utils/
│   ├── PopupHandler.ts      # Popup and cookie handling
│   └── TestHelpers.ts       # Common test utilities
├── playwright.config.ts     # Playwright configuration
└── package.json
```

## Configuration

The tests are configured to:
- Run on Chromium browser
- Use the Magento demo site: `https://magento.softwaretestingboard.com`
- Block ads for faster execution
- Capture screenshots and videos on failure
- Set shipping country to Netherlands (NL)
- Apply discount code: `20poff`

## Key Verifications

- ✅ Discount code application and amount verification
- ✅ Shipping cost calculation for Netherlands
- ✅ Product filtering and availability
- ✅ Cart quantity updates
- ✅ Checkout flow completion

## Notes

- Tests include automatic popup dismissal for better reliability
- All scenarios use the same discount code (`20poff`)
- Shipping verification is specific to Netherlands
- Tests are designed to handle dynamic product availability
- Console logging provides detailed execution feedback

## Troubleshooting

If tests fail:
1. Check if the Magento demo site is accessible
2. Verify product availability in the tested categories
3. Ensure discount code is still valid
4. Check if page selectors have changed
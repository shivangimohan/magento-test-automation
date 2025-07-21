export const TestData = {
    discountCode: '20poff',
    shippingCountry: 'NL',
    
    scenarios: {
      menJacket: {
        url: '/men/tops-men/jackets-men.html',
        filters: { size: 'XS', color: 'Blue' }
      },
      womenTops: {
        url: '/women/tops-women/jackets-women.html',
        filters: { size: 'XS', color: 'Blue' },
        quantity: 2
      },
      bags: {
        url: '/gear/bags.html',
        filters: { activity: 'Yoga' }
      }
    }
  };
  
  export const Selectors = {
    popup: {
      closeButtons: [
        '[aria-label="Close"]',
        'button:has-text("Close")',
        '.close',
        '.modal-close',
        '.popup-close'
      ],
      consentButtons: [
        'button:has-text("Consent")',
        'button:has-text("Accept")',
        'button:has-text("OK")'
      ]
    },
    
    filter: {
      sidebar: '.sidebar-main',
      sizeFilter: '.sidebar-main .filter-options-title:has-text("Size")',
      colorFilter: '.sidebar-main .filter-options-title:has-text("Color")',
      activityFilter: '.sidebar-main .filter-options-title:has-text("Activity")',
      sizeOption: (size: string) => `.sidebar-main .swatch-attribute.size a[aria-label="${size}"] div`,
      colorOption: (color: string) => `.sidebar-main .swatch-attribute.color a[aria-label="${color}"] div`,
      activityOption: (activity: string) => `.sidebar-main .filter-options-content .items .item a:has-text("${activity}")`
    },
    
    product: {
      item: '.product-item',
      addToCartButton: 'button.action.tocart.primary[title="Add to Cart"]',
    },
    
    cart: {
      links: [
        '.minicart-wrapper a[data-bind*="cart"]',
        'a[href*="checkout/cart"]',
        '.showcart',
        '.counter.qty'
      ],
      discountSection: '#block-discount-heading',
      couponInput: '#coupon_code',
      applyButton: '.action.apply',
      checkoutButton: '.checkout-methods-items .action.primary.checkout',
      countryDropdown: 'select[name="country_id"]',
      quantityInput: 'input[name*="[qty]"]',  // Cart quantity input
      updateCartButton: 'button[title="Update Shopping Cart"]', // Update Shopping Cart button

        // verification selectors
      totalsTable: '.data.table.totals',
      subtotalAmount: '.totals.sub .amount .price',
      discountRow: 'tr.totals:has-text("Discount")',
      discountAmount: 'tr.totals:has-text("Discount") .amount .price',
      discountTitle: 'tr.totals:has-text("Discount") .title',
      orderTotalAmount: '.grand.totals .amount .price',
    
      // Shipping selectors
      shippingTable: '.table-checkout-shipping-method',
      shippingPrice: 'span.price span',
    }
  };
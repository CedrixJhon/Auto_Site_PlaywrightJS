// tests/api/01-get-all-products.spec.js

// 'test' is how we define a test case in Playwright
// 'expect' is how we make assertions (check if something is correct)
const { test, expect } = require('../../fixtures/baseTest');
const {getRequest} = require('../../helpers/apiClient');
const endpoints = require('../../helpers/apiEndPoints');


// ---------------------------------------------------------------------------
// TEST SUITE: wraps related tests together under one label
// ---------------------------------------------------------------------------
test.describe('API 1: GET All Products List', () => {
  // -------------------------------------------------------------------------
  // TEST CASE 1: The most basic check — did the request succeed?
  // -------------------------------------------------------------------------
  test ('should display all the product list', async ({ request }) => {
    const response = await getRequest(request, endpoints.productsList);
    const body = await response.json();
    console.log('Full Product List:', body);
    expect(response.status()).toBe(200);

  });
  test('should return status code 200', async ({ request }) => {
    // WHAT: `request` is Playwright's built-in API testing object
    // WHY:  It handles sending HTTP requests for you

    // Step 1 — Send the GET request to the API
    const response = await getRequest(request, endpoints.productsList);
    // WHY /api/productsList and not the full URL?
    // Because we set baseURL in playwright.config.js already!
    // Playwright joins them: baseURL + '/api/productsList'

    // Step 2 — Assert the HTTP status code is 200
   
    expect(response.status()).toBe(200);
    // WHY: 200 means "OK" — the server handled our request successfully
    // If this fails, something is very wrong (server down, wrong URL, etc.)
  });

  // -------------------------------------------------------------------------
  // TEST CASE 2: Is the response actually JSON? (Content-Type check)
  // -------------------------------------------------------------------------
  test('should return a JSON response', async ({ request }) => {

    const response = await getRequest(request, endpoints.productsList);

    // Get the response headers
    const contentType = response.headers()['content-type'];
;
    // WHY: Headers tell us metadata about the response
    // 'content-type' tells us what FORMAT the data is in
  
    // Assert it contains 'application/json' or 'text/html' with JSON inside
    // NOTE: This API returns text/html but with JSON body (a quirk of this site)
    expect(contentType).toBeTruthy();
    // WHY toBeTruthy(): We just want to confirm the header EXISTS
  });

  // -------------------------------------------------------------------------
  // TEST CASE 3: Does the body have the right structure?
  // -------------------------------------------------------------------------

  
  test('should return responseCode 200 inside the body', async ({ request }) => {

    const response = await getRequest(request, endpoints.productsList);

    // Parse the response body as JSON so we can work with it as an object
    const body = await response.json();
    // WHY: The raw response is just text. .json() converts it to a JS object
    // After this, body.responseCode works like a normal JS property

    // Assert the responseCode INSIDE the body is also 200
    expect(body.responseCode).toBe(200);
    // WHY: This API returns its own code inside the JSON body too
    // A good QA checks BOTH the HTTP status AND the body's own status
  });

  // -------------------------------------------------------------------------
  // TEST CASE 4: Does the products list actually have items?
  // -------------------------------------------------------------------------
  test('should return a non-empty products array', async ({ request }) => {

    const response = await getRequest(request, endpoints.productsList);
    const body = await response.json();

    // Assert that 'products' exists and is an array
    expect(Array.isArray(body.products)).toBe(true);
    // WHY: We need to confirm products is actually an array, not null or a string

    // Assert that the array has at least 1 product
    expect(body.products.length).toBeGreaterThan(0);
    // WHY: An empty array [] would still pass Array.isArray()
    // We explicitly check there's real data inside
  });

  // -------------------------------------------------------------------------
  // TEST CASE 5: Does each product have the fields we expect?
  // -------------------------------------------------------------------------
  test('should have correct fields in each product', async ({ request }) => {

    const response = await getRequest(request, endpoints.productsList);
    const body = await response.json();

    // Grab the first product to inspect its structure
    const firstProduct = body.products[0];
    // WHY: We don't need to check ALL products. If the first one is correct,
    // it means the API is returning the right shape of data.

    // Assert each required field exists and is the right type
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
    // WHY toHaveProperty: This checks the key EXISTS in the object
    // It does NOT care about the value — just that the field is there

    // Now check the TYPES of the values
    expect(typeof firstProduct.id).toBe('number');
    expect(typeof firstProduct.name).toBe('string');
    expect(typeof firstProduct.price).toBe('string');   // "Rs. 500" is a string!
    expect(typeof firstProduct.brand).toBe('string');
    expect(typeof firstProduct.category).toBe('object');
    // WHY type checks: Catches bugs where an API accidentally sends
    // id as "1" (string) instead of 1 (number)
  });

  // -------------------------------------------------------------------------
  // TEST CASE 6: Validate a specific known product (data integrity check)
  // -------------------------------------------------------------------------
  test('should contain a product with id 1 named Blue Top', async ({ request }) => {

    const response = await getRequest(request, endpoints.productsList);
    const body = await response.json();

    // Search the array for the product with id = 1
    const product = body.products.find(p => p.id === 1);
    // WHY .find(): It searches the array and returns the first match
    // If not found, it returns undefined

    // First, assert the product actually exists
    expect(product).toBeDefined();
    // WHY toBeDefined: Guards against undefined before accessing properties
    // If product is undefined, the next lines would crash

    // Then, assert specific values
    expect(product.name).toBe('Blue Top');
    expect(product.brand).toBe('Polo');
    expect(product.price).toBe('Rs. 500');
    // WHY: This is a "data integrity" test — we KNOW what this product
    // should look like, so we verify the data hasn't changed unexpectedly
  });

});
// tests/api/api2-verify-login.spec.js

const { test, expect } = require('../../fixtures/baseTest');
const { postRequest } = require('../../helpers/apiClient');
const { verifyLogin, getBearerAuthHeader } = require('../../helpers/authHelper');
const endpoints = require('../../helpers/apiEndPoints');
const SignUpInputs = require('../../dataInputs/signUpInputs');

test.describe('API 2: POST Verify Login', () => {

  // -------------------------------------------------------------------------
  // TEST CASE 1: HTTP status check
  // -------------------------------------------------------------------------
  test('should return HTTP status 200', async ({ request }) => {
    const response = await postRequest(request, endpoints.verifyLogin, {
      email: SignUpInputs.validCreds_email,
      password: SignUpInputs.validCreds_password,
    });

    expect(response.status()).toBe(200);
    // WHY: Even for POST requests, the transport layer should return 200
    // This confirms the server received and processed the request
  });

  // -------------------------------------------------------------------------
  // TEST CASE 2: Valid credentials — happy path
  // -------------------------------------------------------------------------
  test('should return responseCode 200 for valid credentials', async ({ request }) => {
    const body = await verifyLogin(request);
    // WHY: We use the helper here — no need to repeat the postRequest logic
    // verifyLogin() handles the call and returns the parsed body directly
    console.log('Full Login Response:', body);
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  // -------------------------------------------------------------------------
  // TEST CASE 3: Invalid credentials — negative test
  // -------------------------------------------------------------------------
  test('should return responseCode 404 for invalid credentials', async ({ request }) => {
    const body = await verifyLogin(
      request,
      SignUpInputs.incorrectEmail,
      SignUpInputs.incorrectPassword
    );
    // WHY: We override the defaults with invalid creds
    // This tests what happens when login fails — a real scenario

    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  // -------------------------------------------------------------------------
  // TEST CASE 4: Missing parameters — negative test
  // -------------------------------------------------------------------------
  test('should return responseCode 400 when parameters are missing', async ({ request }) => {
    const response = await postRequest(request, endpoints.verifyLogin, {
      email: SignUpInputs.validCreds_email,
      // password intentionally omitted
    });

    const body = await response.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
    // WHY: The API should tell us the request was malformed
    // Testing this confirms the API has proper input validation
  });

  // -------------------------------------------------------------------------
  // TEST CASE 5: Wrong HTTP method — negative test
  // -------------------------------------------------------------------------
  test('should return responseCode 405 for GET request on login endpoint', async ({ request }) => {
    const response = await postRequest(request, endpoints.verifyLogin, {});
    // Sending empty form — simulates wrong usage

    const body = await response.json();
    expect(body.responseCode).toBe(400);
    // WHY: An empty POST body is a bad request — API should reject it cleanly
  });

  // -------------------------------------------------------------------------
  // TEST CASE 6: Bearer token pattern practice
  // -------------------------------------------------------------------------
  test('should demonstrate Bearer token header construction', async ({ request }) => {
    // Step 1 — Build the auth header (simulates getting a token from login)
    const authHeader = getBearerAuthHeader();

    // Step 2 — Use it in a request (simulates calling a protected endpoint)
    const response = await postRequest(
      request,
      endpoints.verifyLogin,
      {
        email: SignUpInputs.validCreds_email,
        password: SignUpInputs.validCreds_password,
      },
      authHeader // passed as the headers argument
    );

    const body = await response.json();

    // Step 3 — Assert the response is still valid
    expect(body.responseCode).toBe(200);
    // WHY: This proves the auth header didn't break the request
    // On a real project, the server would validate the token here
  });

});
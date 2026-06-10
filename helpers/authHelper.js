// helpers/authHelper.js

/**
 * Auth Helper
 *
 * Handles all authentication logic for the test suite.
 * Tests never log in directly — they call these functions instead.
 *
 * WHY a separate file for auth?
 * Because authentication logic is used across many test files.
 * If credentials change, or the login endpoint changes,
 * you update it here — nowhere else.
 */
const { postRequest } = require('./apiClient');
const endpoints = require('./apiEndPoints');
const SignUpInputs = require('../dataInputs/signUpInputs');

/**
 * Verifies login credentials against the API.
 * Returns the full parsed response body.
 *
 * This mirrors the "get a token" step in a Bearer Token flow.
 * On this site we don't get a token back, but the pattern is identical:
 * send credentials → receive confirmation → use result in subsequent calls.
 *
 * @param {object} request   - Playwright's request context
 * @param {string} email     - Email to log in with (defaults to valid creds)
 * @param {string} password  - Password to log in with (defaults to valid creds)
 * @returns {object}         - The parsed response body
 */
async function verifyLogin(request, email = SignUpInputs.validCreds_email, password = SignUpInputs.validCreds_password) {
  const response = await postRequest(request, endpoints.verifyLogin, {
    email: email,
    password: password,
  });

  // Parse and return the body so the caller can inspect it
  const body = await response.json();
  return body;
}

/**
 * Builds an Authorization header using the Bearer Token pattern.
 *
 * On a real project, you would:
 * 1. Call the login endpoint
 * 2. Extract the token from the response
 * 3. Return it formatted as a Bearer header
 *
 * We're practicing that exact pattern here.
 * automationexercise.com encodes credentials as base64 to simulate a token.
 *
 * @param {string} email    - The user's email
 * @param {string} password - The user's password
 * @returns {object}        - A headers object ready to spread into any request
 */
function getBearerAuthHeader(email = SignUpInputs.validCreds_email, password = SignUpInputs.validCreds_password) {
  // In real projects: token comes FROM the login response
  // Here we simulate it using base64 encoding — same transport pattern
  const token = Buffer.from(`${email}:${password}`).toString('base64');

  return {
    Authorization: `Bearer ${token}`,
  };
}

module.exports = {
  verifyLogin,
  getBearerAuthHeader,
};
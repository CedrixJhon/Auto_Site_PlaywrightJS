const { test, expect } = require('../../fixtures/baseTest');
const { postRequest } = require('../../helpers/apiClient');
const { verifyLogin, getBearerAuthHeader } = require('../../helpers/authHelper');
const endpoints = require('../../helpers/apiEndPoints');
const SignUpInputs = require('../../dataInputs/signUpInputs');


  test('should return responseCode 200 for valid credentials', async ({ request }) => {
    const body = await verifyLogin(request);
    // WHY: We use the helper here — no need to repeat the postRequest logic
    // verifyLogin() handles the call and returns the parsed body directly
    console.log('Full Login Response:', body);
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

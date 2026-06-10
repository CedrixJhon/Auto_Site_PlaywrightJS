// helpers/apiClient.js

/**
 * API Client
 * 
 * This is the central helper for making all HTTP requests in our test suite.
 * Instead of writing request logic directly in test files, every test calls
 * these functions. This means:
 *  - Request logic lives in one place
 *  - Tests stay clean and readable
 *  - If headers or base behavior changes, we update it here only
 */

/**
 * Makes a GET request to the given endpoint.
 * 
 * @param {object} request  - Playwright's request context (passed in from the test)
 * @param {string} endpoint - The API path, e.g. '/api/productsList'
 * @param {object} headers  - Optional extra headers to send with the request
 * @returns {Promise}       - The full Playwright response object
 */
async function getRequest(request, endpoint, headers = {}) {
  const response = await request.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...headers, // merge in any extra headers the caller provides
    },
  });
  return response;
}

/**
 * Makes a POST request to the given endpoint.
 * 
 * @param {object} request  - Playwright's request context
 * @param {string} endpoint - The API path
 * @param {object} formData - Key-value pairs to send as form fields
 * @param {object} headers  - Optional extra headers
 * @returns {Promise}       - The full Playwright response object
 * 
 * NOTE: automationexercise.com expects POST data as form fields,
 * not JSON body. That's why we use 'form' here instead of 'data'.
 * On other projects you may use 'data' for JSON payloads instead.
 */
async function postRequest(request, endpoint, formData = {}, headers = {}) {
  const response = await request.post(endpoint, {
    form: formData,
    headers: {
      ...headers,
    },
  });
  return response;
}

/**
 * Makes a PUT request to the given endpoint.
 * 
 * @param {object} request  - Playwright's request context
 * @param {string} endpoint - The API path
 * @param {object} formData - Key-value pairs to send as form fields
 * @param {object} headers  - Optional extra headers
 * @returns {Promise}       - The full Playwright response object
 */
async function putRequest(request, endpoint, formData = {}, headers = {}) {
  const response = await request.put(endpoint, {
    form: formData,
    headers: {
      ...headers,
    },
  });
  return response;
}

/**
 * Makes a DELETE request to the given endpoint.
 * 
 * @param {object} request  - Playwright's request context
 * @param {string} endpoint - The API path
 * @param {object} formData - Key-value pairs to send as form fields (if needed)
 * @param {object} headers  - Optional extra headers
 * @returns {Promise}       - The full Playwright response object
 */
async function deleteRequest(request, endpoint, formData = {}, headers = {}) {
  const response = await request.delete(endpoint, {
    form: formData,
    headers: {
      ...headers,
    },
  });
  return response;
}

module.exports = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
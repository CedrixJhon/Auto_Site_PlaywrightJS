const { test, expect } = require('../../fixtures/baseTest');
const {getRequest} = require('../../helpers/apiClient');
const endpoints = require('../../helpers/apiEndPoints');

test ('should display all the product list', async ({ request }) => {
    const response = await getRequest(request, endpoints.productsList);
    const body = await response.json();
    console.log('Full Product List:', body);
   

  });
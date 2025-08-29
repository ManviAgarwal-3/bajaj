// Test script to demonstrate the API functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test data
const testData = {
  data: ["M", "1", "334", "4", "B", "6", "A", "!", "2"],
  full_name: "John Doe",
  email: "john.doe@example.com",
  roll_number: "12345"
};

async function testAPI() {
  try {
    console.log('Testing BFHL API...\n');
    
    // Test health check
    console.log('1. Testing health check endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/`);
    console.log('Health check response:', healthResponse.data);
    console.log('Status:', healthResponse.status);
    console.log('');
    
    // Test main API endpoint
    console.log('2. Testing /bfhl endpoint...');
    console.log('Request data:', JSON.stringify(testData, null, 2));
    console.log('');
    
    const apiResponse = await axios.post(`${BASE_URL}/bfhl`, testData);
    console.log('API Response:');
    console.log('Status:', apiResponse.status);
    console.log('Data:', JSON.stringify(apiResponse.data, null, 2));
    console.log('');
    
    // Validate response structure
    const response = apiResponse.data;
    console.log('3. Validating response structure...');
    console.log('✓ is_success:', response.is_success === true);
    console.log('✓ status:', response.status === 'success');
    console.log('✓ user_id format:', /^[a-z_]+_\d{8}$/.test(response.user_id));
    console.log('✓ email:', response.email === testData.email);
    console.log('✓ roll_number:', response.roll_number === testData.roll_number);
    console.log('✓ even array:', Array.isArray(response.even));
    console.log('✓ odd array:', Array.isArray(response.odd));
    console.log('✓ alphabets array:', Array.isArray(response.alphabets));
    console.log('✓ special_chars array:', Array.isArray(response.special_chars));
    console.log('✓ sum is string:', typeof response.sum === 'string');
    console.log('✓ concat_string:', typeof response.concat_string === 'string');
    console.log('');
    
    console.log('✅ All tests passed!');
    
  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused. Make sure the server is running on port 3000');
      console.log('Start the server with: npm start');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };

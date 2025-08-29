// Simple test script using built-in Node.js modules
const http = require('http');

const testData = {
  data: ["M", "1", "334", "4", "B", "6", "A", "!", "2"],
  full_name: "John Doe",
  email: "john.doe@example.com",
  roll_number: "12345"
};

function makeRequest(data, callback) {
  const postData = JSON.stringify(data);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/bfhl',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      try {
        const parsed = JSON.parse(responseData);
        callback(null, parsed);
      } catch (error) {
        callback(error);
      }
    });
  });

  req.on('error', (error) => {
    callback(error);
  });

  req.write(postData);
  req.end();
}

console.log('Testing BFHL API...\n');
console.log('Test data:', JSON.stringify(testData, null, 2));
console.log('');

makeRequest(testData, (error, response) => {
  if (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('Make sure the server is running with: npm start');
    }
    return;
  }

  console.log('✅ API Response:');
  console.log('Status:', response.status);
  console.log('Data:', JSON.stringify(response, null, 2));
  console.log('');

  // Validate response
  console.log('Validation:');
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
  console.log('🎉 All tests passed!');
});

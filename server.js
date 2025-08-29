const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to process input data
function processInputData(data) {
  const even = [];
  const odd = [];
  const alphabets = [];
  const specialChars = [];
  let sum = 0;
  let allLetters = '';

  // Process each item in the data array
  data.forEach(item => {
    if (typeof item === 'string') {
      // Check if it's a letter
      if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item.toUpperCase());
        allLetters += item;
      } else if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/.test(item)) {
        specialChars.push(item);
      } else if (!isNaN(item) && item.trim() !== '') {
        // Check if string can be converted to a number
        const num = Number(item);
        if (num % 2 === 0) {
          even.push(num.toString());
        } else {
          odd.push(num.toString());
        }
        sum += num;
      }
    } else if (typeof item === 'number') {
      if (item % 2 === 0) {
        even.push(item.toString());
      } else {
        odd.push(item.toString());
      }
      sum += item;
    }
  });

  // Create concat_string with alternating caps
  let concatString = '';
  for (let i = 0; i < allLetters.length; i++) {
    if (i % 2 === 0) {
      concatString += allLetters[i].toUpperCase();
    } else {
      concatString += allLetters[i].toLowerCase();
    }
  }

  return {
    even,
    odd,
    alphabets,
    special_chars: specialChars,
    sum: sum.toString(),
    concat_string: concatString
  };
}

// POST route /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const { data, full_name, email, roll_number } = req.body;

    // Validate required fields
    if (!data || !Array.isArray(data) || !full_name || !email || !roll_number) {
      return res.status(400).json({
        is_success: false,
        status: "error",
        message: "Missing required fields: data (array), full_name, email, roll_number"
      });
    }

    // Generate user_id in format: full_name_ddmmyyyy
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const user_id = `${full_name.toLowerCase().replace(/\s+/g, '_')}_${day}${month}${year}`;

    // Process the input data
    const processedData = processInputData(data);

    // Return success response
    res.status(200).json({
      is_success: true,
      status: "success",
      user_id,
      email,
      roll_number,
      ...processedData
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      status: "error",
      message: "Internal server error"
    });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'BFHL API is running',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const path = require('path');
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

  data.forEach(item => {
    if (typeof item === 'string') {
      if (/^[a-zA-Z]+$/.test(item)) {
        // full words allowed, convert to uppercase
        alphabets.push(item.toUpperCase());
        allLetters += item; // keep original case for concat string
      } else if (/^[0-9]+$/.test(item)) {
        const num = Number(item);
        if (num % 2 === 0) {
          even.push(item);
        } else {
          odd.push(item);
        }
        sum += num;
      } else {
        // treat as special char(s)
        specialChars.push(item);
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

  // Create concat_string (reverse order, alternating caps)
  let reversed = allLetters.split('').reverse().join('');
  let concatString = '';
  for (let i = 0; i < reversed.length; i++) {
    concatString += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
  }

  return {
    even_numbers: even,
    odd_numbers: odd,
    alphabets,
    special_characters: specialChars,
    sum: sum.toString(),
    concat_string: concatString
  };
}

// POST route /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        status: "error",
        message: "Missing required field: data (array)"
      });
    }

    // Fixed user details (as per assignment spec)
    const full_name = "Manvi_Agarwal";
    const dob = "03112004"; // example DOB, replace with yours
    const email = "manvi.agarwal2022@vitstudent.ac.in";
    const roll_number = "22BRS1015";

    const user_id = `${full_name}_${dob}`;

    const processedData = processInputData(data);

    res.status(200).json({
      is_success: true,
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

// Serve the frontend HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    message: 'BFHL API is running',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;

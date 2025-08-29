# BFHL API

A REST API that processes input data and returns categorized arrays with various transformations.

## Features

- POST endpoint at `/bfhl` that processes input data
- Categorizes numbers into even/odd arrays
- Extracts alphabets and converts to uppercase
- Identifies special characters
- Calculates sum of numbers
- Creates alternating case string from letters
- Generates user_id in format: `full_name_ddmmyyyy`

## API Endpoint

### POST /bfhl

**Request Body:**
```json
{
  "data": ["M", "1", "334", "4", "B", "6", "A", "!", "2"],
  "full_name": "John Doe",
  "email": "john.doe@example.com",
  "roll_number": "12345"
}
```

**Response (Success - HTTP 200):**
```json
{
  "is_success": true,
  "status": "success",
  "user_id": "john_doe_17091999",
  "email": "john.doe@example.com",
  "roll_number": "12345",
  "even": ["4", "6", "2"],
  "odd": ["1", "334"],
  "alphabets": ["M", "B", "A"],
  "special_chars": ["!"],
  "sum": "347",
  "concat_string": "MbA"
}
```

**Response (Error - HTTP 400/500):**
```json
{
  "is_success": false,
  "status": "error",
  "message": "Missing required fields: data (array), full_name, email, roll_number"
}
```

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bfhl-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:
```
PORT=3000
NODE_ENV=development
```

## Local Development

The API will be available at:
- Local: http://localhost:3000
- Health check: http://localhost:3000/
- API endpoint: http://localhost:3000/bfhl

## Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Railway

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Node.js app and deploy it

### Render

1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`

## API Logic

- **Numbers**: Categorized as even/odd, converted to strings, summed
- **Letters**: Extracted, converted to uppercase, used for alternating case string
- **Special Characters**: Identified and returned as array
- **user_id**: Generated as `full_name_ddmmyyyy` in lowercase with underscores
- **concat_string**: All letters with alternating caps (Upper, lower, Upper, ...)

## Error Handling

- Validates required fields (data, full_name, email, roll_number)
- Returns appropriate HTTP status codes
- Includes `is_success` boolean in all responses
- Comprehensive error messages for debugging

## Testing

You can test the API using tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)

Example cURL request:
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{
    "data": ["M", "1", "334", "4", "B", "6", "A", "!", "2"],
    "full_name": "John Doe",
    "email": "john.doe@example.com",
    "roll_number": "12345"
  }'
```

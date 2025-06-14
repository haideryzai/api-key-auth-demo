# API Key Auth Demo

This project demonstrates a simple API key authentication workflow using Node.js and Express.

## Endpoints

### 1. Generate an API Key

**Endpoint:** `POST /generate-key`  
**Description:** Generates a signed API key for a given email and expiry time (in minutes).

**Request Body:**
```json
{
  "email": "user@example.com",
  "expiresIn": 60
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/generate-key \
  -H "Content-Type: application/json" \
  -d '{"email": "haider@example.com", "expiresIn": 10}'
```

**Response:**
```json
{
  "apiKey": "<your_generated_api_key>"
}
```

---

### 2. Access Secure Data

**Endpoint:** `GET /secure-data`  
**Description:** Access a protected route using your API key.

**Headers:**
- `x-api-key: <your_generated_api_key>`

**Example cURL:**
```bash
curl -X GET http://localhost:3000/secure-data \
  -H "x-api-key: <your_generated_api_key>"
```

**Response:**
```json
{
  "message": "Secure data accessed.",
  "user": "haider@example.com",
  "expiresAt": "2025-06-14T12:34:56.789Z"
}
```

---

## Environment Variables

Create a `.env` file in the root directory with the following content:

```
PORT=3000
API_SECRET=my_super_secret_key
```

---

## Running the Server

```bash
npm install
node server.js
```
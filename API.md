# API Documentation

Complete API reference for the Complaint Management System.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses are JSON format:

### Success Response
```json
{
  "data": { ... },
  "message": "Success message"
}
```

### Error Response
```json
{
  "message": "Error message",
  "status": 400
}
```

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Authentication Endpoints

### Sign Up

Create a new user account.

```http
POST /auth/signup
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "message": "User created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Email already in use"
}
```

**Error Response (400):**
```json
{
  "message": "Missing fields"
}
```

---

### Log In

Authenticate and get JWT token.

```http
POST /auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

## Complaint Endpoints

### Submit Complaint

Create a new complaint. (Protected - User & Admin)

```http
POST /complaints
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Product Quality Issue",
  "description": "The product I received has defects. The packaging was damaged and the item is not working as expected."
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Product Quality Issue",
  "description": "The product I received has defects...",
  "status": "pending",
  "userId": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Response (400):**
```json
{
  "message": "Missing fields"
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

---

### Get My Complaints

Retrieve all complaints submitted by the logged-in user. (Protected - User & Admin)

```http
GET /complaints
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Product Quality Issue",
    "description": "The product I received has defects...",
    "status": "pending",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Delivery Issue",
    "description": "Package was not delivered on time...",
    "status": "resolved",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-14T15:45:00Z"
  }
]
```

**Query Parameters:**
- `status` (optional): Filter by status (pending, in_progress, resolved)
- `limit` (optional): Number of results (default: 50)
- `skip` (optional): Number of results to skip for pagination

---

### Get Complaint by ID

Retrieve a specific complaint by ID. (Protected - User & Admin)

```http
GET /complaints/:id
Authorization: Bearer <token>
```

**Parameters:**
- `id` (required): Complaint MongoDB ObjectId

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Product Quality Issue",
  "description": "The product I received has defects...",
  "status": "pending",
  "userId": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Response (404):**
```json
{
  "message": "Complaint not found"
}
```

---

### Update Complaint Status

Update the status of a complaint. (Protected - Admin Only)

```http
PUT /complaints/:id
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Parameters:**
- `id` (required): Complaint MongoDB ObjectId

**Request Body:**
```json
{
  "status": "in_progress"
}
```

**Valid Status Values:**
- `pending` - Complaint received and under review
- `in_progress` - Currently being handled
- `resolved` - Issue has been resolved

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Product Quality Issue",
  "description": "The product I received has defects...",
  "status": "in_progress",
  "userId": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Response (400):**
```json
{
  "message": "Invalid status"
}
```

**Error Response (403):**
```json
{
  "message": "Forbidden"
}
```

---

## Admin Endpoints

### Get All Complaints

Retrieve all complaints in the system. (Protected - Admin Only)

```http
GET /admin/complaints
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Product Quality Issue",
    "description": "The product I received has defects...",
    "status": "pending",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

**Query Parameters:**
- `status` (optional): Filter by status
- `userId` (optional): Filter by user
- `limit` (optional): Number of results
- `skip` (optional): Pagination offset
- `sort` (optional): Sort field (default: -createdAt)

---

### Update Complaint Status (Admin)

Same as regular complaint update, but accessible to admin only.

```http
PUT /admin/complaints/:id
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "resolved"
}
```

**Response (200):** Same as regular update endpoint

---

## Example Requests

### Using cURL

**Sign Up:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Submit Complaint:**
```bash
curl -X POST http://localhost:5000/api/complaints \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Product Issue",
    "description": "Detailed description here"
  }'
```

**Get My Complaints:**
```bash
curl -X GET http://localhost:5000/api/complaints \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Get All Complaints (Admin):**
```bash
curl -X GET http://localhost:5000/api/admin/complaints \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

**Update Status:**
```bash
curl -X PUT http://localhost:5000/api/admin/complaints/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress"
  }'
```

### Using Axios (JavaScript)

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Sign Up
const signup = async (name, email, password) => {
  const response = await api.post('/auth/signup', {
    name,
    email,
    password
  })
  return response.data
}

// Login
const login = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password
  })
  return response.data
}

// Get Complaints
const getComplaints = async () => {
  const response = await api.get('/complaints')
  return response.data
}

// Submit Complaint
const submitComplaint = async (title, description) => {
  const response = await api.post('/complaints', {
    title,
    description
  })
  return response.data
}

// Update Status (Admin)
const updateStatus = async (complaintId, status) => {
  const response = await api.put(`/admin/complaints/${complaintId}`, {
    status
  })
  return response.data
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider implementing:
- Rate limiting middleware (express-rate-limit)
- Per-IP limits
- Per-user limits

---

## Pagination

Supported on endpoints that return arrays:

```http
GET /complaints?limit=10&skip=0
```

**Response includes:**
- Array of items
- Total count in headers (optional)

---

## Sorting

Default sort order: `-createdAt` (newest first)

```http
GET /admin/complaints?sort=-createdAt
```

---

## Validation Rules

### User Email
- Required
- Must be valid email format
- Must be unique (no duplicates)

### Password
- Minimum 6 characters
- Hashed with bcrypt before storage
- Must match password field on signup

### Complaint Title
- Required
- Minimum 3 characters
- Maximum 200 characters

### Complaint Description
- Required
- Minimum 10 characters
- Maximum 5000 characters

### Status
- Must be one of: pending, in_progress, resolved
- Can only be updated by admin

---

## JWT Token

**Token Expiration:** 8 hours

**Token Structure:**
```
Header: { alg: "HS256", typ: "JWT" }
Payload: { id, role, name, iat, exp }
Signature: HS256(secret)
```

---

## Timestamps

All timestamps are in ISO 8601 format (UTC):
```
2024-01-15T10:30:00Z
```

---

For more help, check [Troubleshooting Guide](./TROUBLESHOOTING.md)

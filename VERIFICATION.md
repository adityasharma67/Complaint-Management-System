# Project Verification Checklist

Complete checklist for verifying all components are working correctly.

## ✅ Pre-Deployment Verification

### Project Structure
- [ ] Frontend folder contains src/, public/, package.json
- [ ] Backend folder contains controllers/, models/, routes/, app.js, server.js
- [ ] Docker files present: backend/Dockerfile, frontend/Dockerfile
- [ ] docker-compose.yml exists at root level
- [ ] GitHub Actions workflow: .github/workflows/main.yml

### Environment Files
- [ ] backend/.env exists with MongoDB URI
- [ ] frontend/.env exists with API URL
- [ ] .env.example files present in both frontend and backend

### Dependencies
- [ ] backend/package.json has all required packages
- [ ] frontend/package.json has all required packages
- [ ] No unused dependencies

### Documentation
- [ ] README.md is comprehensive
- [ ] SETUP.md provides clear instructions
- [ ] TROUBLESHOOTING.md covers common issues
- [ ] API.md documents all endpoints

## 🧪 Local Testing

### Backend Testing

**1. Start MongoDB**
```bash
# Option 1: Local MongoDB
mongod

# Option 2: Docker
docker run -d -p 27017:27017 mongo:6
```

**2. Start Backend**
```bash
cd backend
npm install
npm run dev
```

**Expected Output:**
```
✓ Server running on port 5000
✓ MongoDB connected
✓ Default admin user created
```

**3. Test API Endpoints**

- [ ] POST /api/auth/signup
  ```bash
  curl -X POST http://localhost:5000/api/auth/signup \
    -H "Content-Type: application/json" \
    -d '{
      "name":"Test User",
      "email":"test@example.com",
      "password":"testpass123"
    }'
  ```
  Expected: Returns token and user data

- [ ] POST /api/auth/login
  ```bash
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email":"admin@demo.com",
      "password":"admin123"
    }'
  ```
  Expected: Returns token and admin user data

- [ ] POST /api/complaints (with token)
  ```bash
  curl -X POST http://localhost:5000/api/complaints \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "title":"Test Complaint",
      "description":"This is a test complaint"
    }'
  ```
  Expected: Returns complaint object with _id

- [ ] GET /api/complaints (with token)
  Expected: Returns array of user's complaints

- [ ] GET /api/admin/complaints (with admin token)
  Expected: Returns array of all complaints

- [ ] PUT /api/admin/complaints/:id (with admin token)
  ```bash
  curl -X PUT http://localhost:5000/api/admin/complaints/ID \
    -H "Authorization: Bearer ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"status":"in_progress"}'
  ```
  Expected: Returns updated complaint

### Frontend Testing

**1. Install Dependencies**
```bash
cd frontend
npm install
```

**2. Start Development Server**
```bash
npm run dev
```

**Expected Output:**
```
✓ VITE Dev Server ready
✓ Local: http://localhost:3000
```

**3. Test Pages**

- [ ] Home Page
  - Navigate to http://localhost:3000
  - Verify landing page loads
  - Check responsive design

- [ ] Login Page
  - Click "Login" button
  - Enter: admin@demo.com / admin123
  - Should redirect to admin dashboard

- [ ] Signup Page
  - Click "Signup" button
  - Fill form and submit
  - Should create account and redirect to dashboard

- [ ] User Dashboard
  - View submitted complaints
  - Filter by status
  - Check complaint statistics

- [ ] Submit Complaint
  - Click "New Complaint"
  - Fill title and description
  - Submit and verify success

- [ ] Admin Dashboard
  - View all complaints
  - Update complaint status
  - See statistics update

**4. Test Authentication**

- [ ] Token stored in localStorage
- [ ] Protected routes require login
- [ ] Logout clears token
- [ ] Auto-redirect to login on 401 error

**5. Test UI Features**

- [ ] Toast notifications appear
- [ ] Loading spinners show
- [ ] Responsive design works on mobile
- [ ] Buttons and forms are functional

## 🐳 Docker Testing

### Build Images

**1. Build Backend Image**
```bash
docker build -t complaint-backend:latest ./backend
```
Expected: Image builds successfully

**2. Build Frontend Image**
```bash
docker build -t complaint-frontend:latest ./frontend
```
Expected: Image builds successfully

**3. Build with Docker Compose**
```bash
docker-compose build
```
Expected: All services build without errors

### Run with Docker Compose

**1. Start Services**
```bash
docker-compose up --build
```

**Expected Output:**
```
✓ mongo is healthy
✓ backend is running
✓ frontend is running
```

**2. Test Access**

- [ ] Frontend accessible at http://localhost:3000
- [ ] Backend accessible at http://localhost:5000
- [ ] MongoDB accessible on 27017
- [ ] Services communicate correctly

**3. Test Functionality**

- [ ] Login with admin@demo.com / admin123
- [ ] Submit a complaint
- [ ] View complaints
- [ ] Update status as admin

**4. Check Container Logs**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongo
```

Expected: No error messages

### Docker Network

- [ ] Frontend can reach backend service
- [ ] Backend can reach MongoDB service
- [ ] Environment variables loaded correctly

## 🔄 GitHub Actions Testing

### Workflow File

- [ ] .github/workflows/main.yml exists
- [ ] Triggers on push to main/master
- [ ] All jobs defined correctly

### CI/CD Steps

- [ ] Checkout code step
- [ ] Setup Node.js
- [ ] Install backend dependencies
- [ ] Install frontend dependencies
- [ ] Build frontend
- [ ] Build Docker images
- [ ] Login to Docker Hub
- [ ] Push images

### Local Workflow Testing

```bash
# Install act (GitHub Actions locally)
brew install act  # macOS
choco install act # Windows

# Run workflow locally
act push
```

Expected: All steps pass

## 📊 Database Verification

### MongoDB Data

**1. Connect to MongoDB**
```bash
mongosh "mongodb://localhost:27017/complaintsdb"
```

**2. Check Collections**
```javascript
show collections
```

Expected: users, complaints collections exist

**3. Verify Default Data**
```javascript
db.users.find().pretty()
```

Expected:
- Admin user exists
- Demo user exists
- Passwords are hashed

**4. Check Complaints**
```javascript
db.complaints.find().pretty()
```

Expected:
- Complaints have correct fields
- Status field uses lowercase values
- userId references exist

## 🔒 Security Checks

- [ ] Passwords are hashed (bcrypt)
- [ ] JWT tokens used for auth
- [ ] Sensitive data in .env (not in code)
- [ ] CORS enabled appropriately
- [ ] No console.log of sensitive data
- [ ] Error messages don't leak info
- [ ] Admin routes protected
- [ ] User can't access other user's data

## ⚡ Performance Checks

- [ ] Frontend builds in < 30 seconds
- [ ] Backend starts in < 5 seconds
- [ ] Docker images < 500MB
- [ ] API responses < 1 second
- [ ] No memory leaks on long runs

## 🎨 UI/UX Verification

- [ ] Consistent color scheme
- [ ] Readable fonts and sizes
- [ ] Proper spacing and alignment
- [ ] Responsive on mobile (375px)
- [ ] Responsive on tablet (768px)
- [ ] Responsive on desktop (1920px)
- [ ] Dark mode not needed (light theme)
- [ ] Navigation intuitive
- [ ] Forms are user-friendly
- [ ] Feedback is clear (toasts, loaders)

## 📝 Code Quality

- [ ] No console.log statements
- [ ] No commented code
- [ ] Consistent indentation (2 spaces)
- [ ] Meaningful variable names
- [ ] Functions have single responsibility
- [ ] Error handling present
- [ ] No hardcoded values (use .env)

## 🚀 Deployment Readiness

- [ ] NODE_ENV=production in .env
- [ ] Database credentials not in code
- [ ] .env files excluded from git
- [ ] Docker images optimized
- [ ] No dev dependencies in production
- [ ] Health checks implemented
- [ ] Graceful error handling
- [ ] Logging for debugging

## 📋 Final Checklist

- [ ] All features working
- [ ] No console errors
- [ ] No API errors (all 2xx responses)
- [ ] Database is persisting data
- [ ] Docker setup is correct
- [ ] CI/CD workflow ready
- [ ] Documentation is complete
- [ ] Code is clean and documented
- [ ] Ready for production

## 🎯 Sign-Off

- [ ] All tests passed
- [ ] No known issues
- [ ] Documentation complete
- [ ] Ready for deployment
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Backup of database created
- [ ] Team has access to repo

---

## Test Results

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend  | ✓      | All pages working |
| Backend   | ✓      | All APIs functional |
| MongoDB   | ✓      | Data persisting |
| Docker    | ✓      | Containers running |
| CI/CD     | ✓      | Workflow ready |
| Security  | ✓      | All checks passed |
| UI/UX     | ✓      | Responsive design |

---

**Verification Date**: ________________
**Verified By**: ________________
**Sign-Off**: ________________


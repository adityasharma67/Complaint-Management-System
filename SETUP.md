# Setup Instructions

Complete step-by-step guide to set up the Complaint Management System.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Docker Setup](#docker-setup)
- [Production Deployment](#production-deployment)
- [Verification](#verification)

## Prerequisites

### System Requirements

- **Operating System**: Windows, macOS, or Linux
- **RAM**: Minimum 2GB (4GB recommended)
- **Disk Space**: Minimum 2GB free space

### Required Software

1. **Node.js** (v18 or higher)
   ```bash
   # Download from https://nodejs.org/
   # Verify installation
   node --version
   npm --version
   ```

2. **MongoDB** (v6 or higher)
   ```bash
   # Option 1: Local installation
   # Download from https://www.mongodb.com/try/download/community
   
   # Option 2: Use Docker (recommended)
   docker run -d -p 27017:27017 mongo:6
   ```

3. **Git**
   ```bash
   # Download from https://git-scm.com/
   git --version
   ```

4. **Docker** (optional, for containerized setup)
   ```bash
   # Download from https://www.docker.com/products/docker-desktop
   docker --version
   docker-compose --version
   ```

## Local Development Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/adityasharma67/Complaint-Management-System.git
cd Complaint-Management-System
```

### Step 2: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/complaintsdb
   JWT_SECRET=supersecretkey123
   NODE_ENV=development
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   Server running on port 5000
   MongoDB connected
   Default admin user created: admin@demo.com / admin123
   ```

### Step 3: Frontend Setup (New Terminal)

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file** (if needed)
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Start frontend development server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE v4.4.0  ready in 123 ms
   
   ➜  Local:   http://localhost:5000
   ➜  Press h to show help
   ```

### Step 4: Verify Installation

1. **Open browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

2. **Test login**
   - Use demo credentials:
     - Email: `admin@demo.com`
     - Password: `admin123`

3. **Test functionality**
   - Submit a complaint
   - View complaints
   - Update status (as admin)

## Docker Setup

### Step 1: Prerequisites

- Docker Desktop installed and running
- Clone repository (same as above)

### Step 2: Create Environment Files

**backend/.env**
```env
PORT=5000
MONGO_URI=mongodb://admin:password123@mongo:27017/complaintsdb?authSource=admin
JWT_SECRET=supersecretkey123
NODE_ENV=production
```

**frontend/.env**
```env
VITE_API_URL=http://backend:5000
```

### Step 3: Build and Run

1. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build backend image
   - Build frontend image
   - Start MongoDB container
   - Start backend container
   - Start frontend container

2. **Wait for services to be ready**
   ```
   ✅ mongo is healthy
   ✅ backend is healthy
   ✅ frontend is running
   ```

### Step 4: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://admin:password123@localhost:27017/

### Step 5: Common Docker Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose stop

# Start services
docker-compose start

# Restart services
docker-compose restart

# Remove containers and volumes
docker-compose down

# Remove everything including volumes (careful!)
docker-compose down -v
```

## Production Deployment

### Option 1: Docker Hub + Cloud Server

1. **Push images to Docker Hub**
   ```bash
   docker login
   docker tag complaint-backend:latest USERNAME/complaint-backend:latest
   docker push USERNAME/complaint-backend:latest
   
   docker tag complaint-frontend:latest USERNAME/complaint-frontend:latest
   docker push USERNAME/complaint-frontend:latest
   ```

2. **Deploy on server**
   ```bash
   # SSH into server
   ssh user@your-server.com
   
   # Clone repository
   git clone https://github.com/adityasharma67/Complaint-Management-System.git
   
   # Update docker-compose.yml with your images
   docker-compose up -d
   ```

### Option 2: Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Deploy backend**
   ```bash
   cd backend
   heroku create complaint-backend
   heroku addons:create mongolab:sandbox
   git push heroku main
   ```

3. **Deploy frontend**
   ```bash
   cd frontend
   heroku create complaint-frontend
   npm run build
   git push heroku main
   ```

### Option 3: AWS Deployment

1. **Push to ECR**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
   
   docker tag complaint-backend:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/complaint-backend:latest
   docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/complaint-backend:latest
   ```

2. **Deploy on ECS/Fargate**
   - Create task definition
   - Create service
   - Configure load balancer

## Verification

### Backend Verification

```bash
# Test API endpoints
curl http://localhost:5000/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"admin123"}'

# Should return JWT token and user info
```

### Frontend Verification

1. **Check page loads**
   - Homepage visible
   - Navigation bar present
   - Responsive design works

2. **Test authentication**
   - Login page works
   - Signup page works
   - JWT token stored in localStorage

3. **Test functionality**
   - Submit complaint
   - View complaints
   - Filter by status
   - Update status (admin only)

### Database Verification

```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/complaintsdb

# Check collections
show collections

# Check data
db.users.find().pretty()
db.complaints.find().pretty()
```

## Troubleshooting During Setup

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### MongoDB Connection Failed

```bash
# Ensure MongoDB is running
# Check MONGO_URI in .env matches your setup
# For local: mongodb://localhost:27017/complaintsdb
# For Docker: mongodb://admin:password123@mongo:27017/complaintsdb?authSource=admin
```

### npm install Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Port 27017 Already in Use

```bash
# MongoDB already running or another service using the port
# Either stop MongoDB or use different port
```

## Next Steps

1. **Development**
   - Start making changes
   - Test functionality
   - Commit to git

2. **Testing**
   - Manual testing (already done)
   - Unit tests (can be added)
   - Integration tests (can be added)

3. **Deployment**
   - Push to GitHub
   - GitHub Actions runs CI/CD
   - Push Docker images
   - Deploy to production

4. **Monitoring**
   - Monitor application logs
   - Track performance metrics
   - Monitor database size

## Support

For detailed troubleshooting, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

**Setup complete! 🎉**

You're now ready to use the Complaint Management System.

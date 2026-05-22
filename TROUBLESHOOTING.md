# Troubleshooting Guide

Common issues and their solutions.

## MongoDB Connection Issues

### Issue: "MongoNetworkError: connect ECONNREFUSED"

**Solution:**
```bash
# Make sure MongoDB is running
# For local MongoDB
mongod

# For Docker
docker-compose up mongo

# Check connection string in .env
MONGO_URI=mongodb://localhost:27017/complaintsdb
```

### Issue: "MongoAuthenticationError: authentication failed"

**Solution:**
```bash
# Update .env with correct credentials
MONGO_URI=mongodb://admin:password123@mongo:27017/complaintsdb?authSource=admin

# If using Docker, verify in docker-compose.yml
# MONGO_USER and MONGO_PASSWORD match credentials
```

## Docker Issues

### Issue: "Docker daemon is not running"

**Solution:**
```bash
# Windows (Docker Desktop)
# Open Docker Desktop application

# Linux
sudo systemctl start docker

# Verify Docker is running
docker --version
```

### Issue: "Port 3000 or 5000 already in use"

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=5001  # for backend
```

### Issue: "Docker build fails with 'npm install' error"

**Solution:**
```bash
# Clear Docker cache and rebuild
docker-compose down
docker system prune -a
docker-compose up --build

# Or build specific service
docker-compose build --no-cache backend
```

## Frontend Issues

### Issue: "Cannot find module '@/' errors in Vite"

**Solution:**
- Check vite.config.js has correct alias configuration
- Reinstall dependencies: `npm ci`
- Clear node_modules: `rm -rf node_modules && npm ci`

### Issue: "Tailwind CSS not working"

**Solution:**
```bash
# Make sure tailwind is installed
npm install -D tailwindcss postcss autoprefixer

# Rebuild frontend
npm run build

# Clear browser cache (Ctrl+Shift+Delete)
```

### Issue: "API calls returning 401 Unauthorized"

**Solution:**
- Check JWT token is being sent in Authorization header
- Verify token hasn't expired (check JWT_SECRET matches backend)
- Clear localStorage and login again
- Check browser console for error details

### Issue: "Blank page or components not rendering"

**Solution:**
```bash
# Clear cache and rebuild
npm run build

# Check for console errors
# Open Developer Tools (F12) → Console tab

# Try clearing npm cache
npm cache clean --force
npm ci
```

## Backend Issues

### Issue: "Error: ENOENT: no such file or directory"

**Solution:**
```bash
# Make sure you're in correct directory
cd backend

# Install dependencies
npm ci

# Check if .env file exists
ls -la .env
```

### Issue: "JWT verification fails"

**Solution:**
```bash
# Ensure JWT_SECRET is set correctly
# Check .env file
JWT_SECRET=your_secret_key

# Restart backend service
npm run dev

# Clear browser localStorage and login again
```

### Issue: "Cannot POST /api/complaints"

**Solution:**
- Verify backend is running on port 5000
- Check authorization header is included
- Verify JWT token is valid
- Check request body is JSON format

```bash
# Test API with curl
curl -X POST http://localhost:5000/api/complaints \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test complaint"}'
```

## GitHub Actions / CI/CD Issues

### Issue: "Docker build fails in GitHub Actions"

**Solution:**
1. Check Docker Hub secrets are set correctly
2. Verify Docker credentials have push permissions
3. Check Dockerfile has correct COPY and RUN commands
4. View GitHub Actions logs for detailed error

### Issue: "npm install fails in CI/CD"

**Solution:**
```bash
# Clear GitHub Actions cache
# Settings → Actions → General → Clear all caches

# Update workflow to use npm ci instead of npm install
# (Already fixed in our workflow)
```

### Issue: "Push to Docker Hub fails"

**Solution:**
```bash
# Verify secrets are set
# Settings → Secrets and variables → Actions

# Required secrets:
# DOCKER_USERNAME
# DOCKER_PASSWORD

# Generate Docker Hub access token:
# https://hub.docker.com/settings/security
```

## Database Issues

### Issue: "Duplicate key error for email"

**Solution:**
```bash
# The email already exists in database
# Use a different email address
# Or clear database:

# MongoDB command
db.users.deleteMany({});

# Docker way
docker-compose down -v  # Removes volumes
docker-compose up
```

### Issue: "Complaint status not updating"

**Solution:**
```bash
# Verify status value is valid
# Valid values: pending, in_progress, resolved

# Check MongoDB directly
# Connect to MongoDB and verify data
mongosh "mongodb://localhost:27017/complaintsdb"
db.complaints.find().pretty()
```

## Performance Issues

### Issue: "Application is slow"

**Solution:**
1. Check MongoDB query performance
2. Enable database indexes (already done in schema)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check browser console for errors
5. Monitor network requests (DevTools → Network tab)

### Issue: "High memory usage"

**Solution:**
```bash
# Check running processes
docker stats

# Restart services
docker-compose restart

# Or rebuild fresh
docker-compose down
docker-compose up --build
```

## Permission Issues

### Issue: "Permission denied when running docker commands"

**Solution:**
```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER

# Or use sudo
sudo docker-compose up

# Restart Docker
sudo systemctl restart docker
```

## Network Issues

### Issue: "Cannot connect to backend from frontend"

**Solution:**
```bash
# Check backend is running
curl http://localhost:5000

# Check VITE_API_URL in frontend .env
VITE_API_URL=http://localhost:5000

# In Docker, use service name
VITE_API_URL=http://backend:5000

# Clear CORS errors in app.js
app.use(cors({ origin: '*' }));  # Already set
```

## Environment Variables

### Issue: "Variables not being read"

**Solution:**
```bash
# Make sure .env file exists
ls -la .env

# Check format (no spaces around =)
PORT=5000  ✓
PORT = 5000  ✗

# Restart service after changing .env
npm run dev

# Docker: restart container
docker-compose restart backend
```

## Getting Help

If you encounter an issue not listed here:

1. **Check the error message** - Usually indicates the problem
2. **View logs:**
   ```bash
   # Backend logs
   npm run dev

   # Docker logs
   docker-compose logs -f

   # Browser console
   F12 → Console tab
   ```
3. **Search GitHub Issues** - Your issue might be reported
4. **Create a new issue** with:
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version, Docker version)
   - Relevant logs

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Still need help?** Create an issue on [GitHub](https://github.com/adityasharma67/Complaint-Management-System/issues)

# Complaint Management System

Simple full-stack Complaint Management System with Docker and CI.

Services:
- Frontend: static HTML/JS served by Nginx (port 3000)
- Backend: Node.js + Express (port 5000)
- MongoDB

Quick start (requires Docker & Docker Compose):

1. Ensure `.env` exists in repository root (we provide a default `.env`). Adjust values if needed.
2. Build and start services:

```bash
docker-compose up --build
```

3. Open http://localhost:3000 to use the frontend. Backend API runs on http://localhost:5000/api

Default admin credentials (created automatically on DB init):

- Email: admin@example.com
- Password: adminpass

Notes:
- GitHub Actions workflow builds and pushes Docker images to Docker Hub. Set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in repository secrets.
- Change `JWT_SECRET`, `ADMIN_PASSWORD`, and other secrets before production use.

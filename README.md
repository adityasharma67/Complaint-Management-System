# Complaint Management System

Simple full-stack Complaint Management System with Docker and CI.

Services:
- Frontend: static HTML/JS served by Nginx (port 3000)
- Backend: Node.js + Express (port 5000)
- MongoDB

Quick start (requires Docker & Docker Compose):

1. Copy `.env.example` to `backend/.env` and adjust if needed.
2. Run:

```bash
docker-compose up --build
```

3. Open http://localhost:3000 to use the frontend. Backend API runs on http://localhost:5000/api

Notes:
- GitHub Actions workflow builds Docker images and pushes to Docker Hub. Set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in repository secrets.
- Default JWT secret in compose is `supersecret` — change for production.

# Complaint Management System (CMS)

A modern, production-ready full-stack Complaint Management System with a responsive React frontend, Express.js backend, MongoDB database, and complete DevOps setup.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18-green.svg)
![React](https://img.shields.io/badge/react-18.2-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-6-green.svg)

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with role-based access control
- **Complaint Submission**: Easy-to-use interface for submitting complaints with title and description
- **Real-time Tracking**: Users can track their complaint status in real-time
- **Admin Dashboard**: Comprehensive admin panel for managing all complaints
- **Status Management**: Update complaint status (Pending → In Progress → Resolved)
- **Responsive Design**: Beautiful, fully responsive UI with Tailwind CSS
- **Docker Support**: Complete Docker and docker-compose setup
- **CI/CD Pipeline**: GitHub Actions workflow for automated testing and deployment
- **Security**: Password hashing with bcrypt, JWT tokens, CORS protection
- **Production Ready**: Optimized for performance and scalability

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
git clone https://github.com/adityasharma67/Complaint-Management-System.git
cd Complaint-Management-System
docker-compose up --build
```

Open http://localhost:3000

### Option 2: Local Development

**Backend:**
```bash
cd backend
npm install
npm run dev  # Starts on port 5000
```

**Frontend (new terminal):**
```bash
cd frontend
npm install
npm run dev  # Starts on port 3000
```

## 🔑 Demo Credentials

- **Admin**: admin@demo.com / admin123
- **User**: user@demo.com / password123

## 📚 Documentation

- **[Setup Instructions](./SETUP.md)** - Complete setup guide
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[API Documentation](./API.md)** - API endpoints reference

## 📦 Tech Stack

### Frontend
- React 18.2
- Vite 4
- Tailwind CSS
- React Router
- Axios
- React Toastify

### Backend
- Node.js 18
- Express.js
- MongoDB 6
- Mongoose
- JWT
- Bcrypt

### DevOps
- Docker
- Docker Compose
- GitHub Actions
- MongoDB

## 🏗️ Project Structure

```
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/           # Page components
│   │   ├── api/             # API client
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # CSS files
│   └── Dockerfile
├── backend/                   # Express.js application
│   ├── controllers/          # Business logic
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Authentication
│   ├── config/              # Configuration
│   └── Dockerfile
├── .github/workflows/        # GitHub Actions
└── docker-compose.yml        # Docker orchestration
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login user

### Complaints
- `POST /api/complaints` - Submit complaint
- `GET /api/complaints` - Get user complaints
- `GET /api/complaints/:id` - Get complaint details

### Admin
- `GET /api/admin/complaints` - Get all complaints
- `PUT /api/admin/complaints/:id` - Update complaint status

For detailed API documentation, see [API.md](./API.md)

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build --no-cache backend
```

## 🔄 GitHub Actions CI/CD

The project includes automated CI/CD that:
- Installs dependencies
- Builds Docker images
- Pushes to Docker Hub
- Runs security scans

**Setup:**
1. Add secrets to GitHub: `DOCKER_USERNAME`, `DOCKER_PASSWORD`
2. Pipeline runs automatically on push to main branch

## 📝 Environment Variables

### Backend
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/complaintsdb
JWT_SECRET=your_secret_key
NODE_ENV=production
```

### Frontend
```
VITE_API_URL=http://localhost:5000
```

## 🛠️ Development

```bash
# Backend development
cd backend
npm run dev    # Start with nodemon

# Frontend development
cd frontend
npm run dev    # Start Vite dev server
npm run build  # Build for production
```

## 📖 Troubleshooting

For common issues and solutions, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

Common issues:
- MongoDB connection refused → Start MongoDB or use Docker
- Port already in use → Change PORT in .env or kill process
- npm install fails → Clear cache: `npm cache clean --force`

## 🎯 Features Implemented

✅ User signup/login with JWT
✅ Complaint CRUD operations
✅ Admin complaint management
✅ Status filtering
✅ Responsive UI
✅ Docker containerization
✅ Docker Compose orchestration
✅ GitHub Actions CI/CD
✅ Default admin user creation
✅ Password hashing with bcrypt

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Contributing

Contributions welcome! Please feel free to submit pull requests.

## 🤝 Support

- **Issues**: GitHub Issues
- **Email**: support@cms.com
- **Docs**: See [SETUP.md](./SETUP.md) and [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## 🔗 Links

- [GitHub Repository](https://github.com/adityasharma67/Complaint-Management-System)
- [API Documentation](./API.md)
- [Setup Guide](./SETUP.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

---

**Built with ❤️ for efficient complaint management**

**Made with**: React • Express • MongoDB • Docker • GitHub Actions

1. Copy `.env.example` to `backend/.env` and adjust if needed.
2. Run:

```bash
docker-compose up --build
```

3. Open http://localhost:3000 to use the frontend. Backend API runs on http://localhost:5000/api

Notes:
- GitHub Actions workflow builds Docker images and pushes to Docker Hub. Set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in repository secrets.
- Default JWT secret in compose is `supersecret` — change for production.

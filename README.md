# 🌟 SkinGlow - Full-Stack Skincare E-Commerce Platform

A modern, scalable full-stack web application for a premium skincare product store. Built with React (frontend), Node.js/Express (backend), and containerized with Docker.

## 🎯 Features

✨ **Frontend (React)**
- Responsive product catalog with dynamic loading
- Shopping cart functionality
- Contact form with validation
- Modern gradient-based UI design
- Real-time cart updates

⚙️ **Backend (Node.js/Express)**
- RESTful API for products and cart management
- CORS-enabled for cross-origin requests
- Error handling and validation
- Health check endpoint
- Environment variable configuration

🐳 **Docker & Orchestration**
- Docker containerization for both frontend and backend
- Docker Compose for easy multi-container deployment
- Nginx reverse proxy for production
- Health checks and automatic restarts

## 📁 Project Structure

```
GITOKER/
├── frontend/                 # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── Products.js
│   │   │   ├── Cart.js
│   │   │   ├── Contact.js
│   │   │   └── Footer.js
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend/                  # Express API server
│   ├── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── docker-compose.yml        # Docker Compose configuration
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for local development)
- Docker & Docker Compose (for containerized deployment)
- Git

### Option 1: Local Development

**Backend Setup:**
```bash
cd backend
npm install
npm start
```
The API will run on `http://localhost:5000`

**Frontend Setup (in a new terminal):**
```bash
cd frontend
npm install
npm start
```
The app will open at `http://localhost:3000`

### Option 2: Docker Compose (Recommended)

**Build and run all services:**
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: `http://localhost`
- Backend API: `http://localhost/api`

**Stop services:**
```bash
docker-compose down
```

## 📚 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `POST /api/cart` - Add item to cart
  ```json
  {
    "productId": 1,
    "quantity": 2
  }
  ```

### Contact
- `POST /api/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Your message here"
  }
  ```

### Health Check
- `GET /api/health` - Server status

## 🛠️ Development

### Running Backend in Watch Mode
```bash
cd backend
npm install -g nodemon  # Install globally if not done
npm run dev
```

### Building Frontend for Production
```bash
cd frontend
npm run build
```

The optimized build will be in `frontend/build/`

## 🐳 Docker Commands

**Build images individually:**
```bash
# Frontend
docker build -t skinglow-frontend ./frontend

# Backend
docker build -t skinglow-backend ./backend
```

**Run containers:**
```bash
# Backend
docker run -p 5000:5000 skinglow-backend

# Frontend
docker run -p 80:80 skinglow-frontend
```

## 📝 Environment Variables

**Backend (.env):**
```
PORT=5000
NODE_ENV=production
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost/api
```

## 🔄 Next Steps - Git & Deployment

### Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Full-stack SkinGlow application"
```

### Push to GitHub
```bash
git remote add origin https://github.com/yourusername/skinglow.git
git branch -M main
git push -u origin main
```

### Deploy to Production
Options:
- **Docker Hub** - Push images to Docker Hub registry
- **AWS ECS** - Use Elastic Container Service
- **Heroku** - Deploy with buildpacks
- **DigitalOcean App Platform** - Simple container deployment
- **Vercel** (Frontend) + Render/Railway (Backend)

## 📦 Technologies Used

- **Frontend**: React 18, Axios, CSS3
- **Backend**: Node.js, Express.js, CORS
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (Alpine Linux)
- **Version Control**: Git

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Tips

- Use `docker-compose logs -f` to view real-time logs
- Check health status: `curl http://localhost/api/health`
- Scale services: Modify `docker-compose.yml` and add more replicas

---

**Happy coding! 🎨✨**

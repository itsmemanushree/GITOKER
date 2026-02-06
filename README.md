# SkinGlow (GITOKER)

SkinGlow is a simple full‑stack skincare shopping app. The frontend shows products, cart, and a contact form. The backend provides the API and stores data.

## What this project is about
- Browse skincare products
- Add items to a cart
- Send a contact form
- Works the same on any computer using Docker

## How the project runs (simple view)
- **Frontend**: React app served by Nginx
- **Backend**: Node.js/Express API
- **Docker Compose**: Runs both together

---

## Run the project (recommended: Docker)

### Step 1: Requirements
- Docker Desktop
- Git

### Step 2: Get the code
```bash
git clone https://github.com/itsmemanushree/GITOKER.git
cd GITOKER
```

### Step 3: Build and start the app
```bash

### Step 5: Stop the app
```bash
docker compose down
```

---

## Run locally (no Docker)

### Backend
```bash
cd backend
npm install
npm start
```
Backend runs at: http://localhost:5000

### Frontend (new terminal)
```bash
cd frontend
npm install
npm start
```
Frontend runs at: http://localhost:3000

---

## Run tests easily

### Local tests
```bash
cd backend
npm test
```
```bash
cd frontend
npm test
```

### Docker tests
```bash
docker compose exec backend npm test
```
```bash
docker compose exec frontend npm test
```

---

## Environment variables
### Backend
- `PORT` (default `5000`)
- `NODE_ENV` (use `production` in Docker)

### Frontend
- `REACT_APP_API_URL` (default `http://localhost:5000/api` for local dev)

## API routes
Base URL (local dev): `http://localhost:5000`

### Health
- `GET /api/health`

### Products
- `GET /api/products`
- `GET /api/products/:id`

### Cart
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/:id`
- `DELETE /api/cart/:id`

### Contact
- `GET /api/contact`
- `GET /api/contact/:id`
- `POST /api/contact`
- `PUT /api/contact/:id`
- `DELETE /api/contact/:id`

---

## If something doesn’t work
- Make sure Docker Desktop is running
- Make sure ports 3000 and 5000 are free
- If needed, stop all containers: `docker compose down`

---

## Project structure (short)
```
GITOKER/
├── frontend/
├── backend/
├── docker-compose.yml
└── README.md
```
```bash

docker compose up -d


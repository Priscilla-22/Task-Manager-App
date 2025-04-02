# Task Management App (Monolith)

A full-stack task management application with authentication, built with:
- **Backend**: FastAPI (Python)
- **Frontend**: Next.js 15
- **Database**: PostgreSQL
- **CI/CD**: GitHub Actions

![App Screenshot](https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-04-02%2018-00-56.png?updatedAt=1743606149819)

## Features

- User authentication (JWT)
- Create, read, update, and delete tasks
- Responsive UI with Tailwind CSS and ShadCN components
- Dockerized deployment
- Automated CI/CD pipeline

## Prerequisites

- Docker Engine (v20.10+)
- Docker Compose (v2.0+)
- Node.js (v18+) - for local development
- Python (v3.9+) - for local development

## Quick Start (Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```
2. Start the services:


```bash
docker-compose up -d
```
3. Access the applications:

``Frontend: http://localhost:3000   ``

``Backend API: http://localhost:5000``

``API Docs: http://localhost:5000/docs``

4. Project Structure
```bash
task-manager/
├── client/                 # Next.js frontend
│   ├── src/
│   ├── public/
│   └── Dockerfile
├── server/                 # FastAPI backend
│   ├── app/
│   └── Dockerfile
├── docker-compose.yml      # Development setup
├── docker-compose.prod.yml # Production setup
└── .github/workflows/      # CI/CD pipelines
```

## Configuration
- Environment Variables
  a. Create .env files in both client and server directories:

- Backend (.env)

```
DATABASE_URL=postgresql://postgres:newpassword@db:5432/postgres
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

- Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

b. Development Workflow
- Start the database:

```bash
docker-compose up -d db
```

- Run backend (in server directory):

```bash
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

- Run frontend (in client directory):

```bash
npm install
npm run dev
```
## Production Deployment

- Using Docker Compose
  Build and start production containers:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```
View logs:

```bash
docker-compose -f docker-compose.prod.yml logs -f
```
-  CI/CD Pipeline

The GitHub Actions workflow automatically:

Builds Docker images on push to main branch

Pushes images to GitHub Container Registry

Deploys to your server via SSH

## API Documentation
Access the interactive API docs at:

- Development: ``http://localhost:5000/docs``

- Production: ```http://your-domain.com:5000/docs```

## Troubleshooting
Database connection issues:

```bash

docker-compose down -v
docker-compose up -d
```
Frontend not updating:

```bash

docker-compose build frontend
docker-compose up -d --no-deps frontend
```

## License
MIT License - See LICENSE for details.
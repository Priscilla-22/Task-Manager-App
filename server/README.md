# Task Management API with FastAPI and PostgreSQL

## Overview

- A RESTful Task Management API built with FastAPI and PostgreSQL, featuring JWT authentication, task CRUD operations, and Dockerized deployment.

### Features

1. ✅ User Authentication

- JWT-based access tokens

- Password hashing (bcrypt)

- Protected endpoints


2. ✅ Task Management

- Create, read, update, and delete tasks

- Task ownership (users can only access their own tasks)

 - Task status tracking (completed/incomplete)


3. ✅ Database & ORM

- PostgreSQL database

- SQLAlchemy ORM


4. ✅ Deployment

- Dockerized setup

- Easy scaling with Docker Compose

### Prerequisites

Docker & Docker Compose installed

(Optional) PostgreSQL client (e.g., psql) for direct DB access

#### Setup & Deployment

1. Clone the Repository
```bash

git clone <repository-url>
cd <project-directory>
```

2. Start the Application
```bash
// Runs the FastAPI app (fastapi-app) and PostgreSQL (db) in detached mode.

docker-compose up -d
```

API will be available at:

- FastAPI docs: http://localhost:5000/docs

- API Base URL: http://localhost:5000/api/

3. Rebuild Containers (if needed)
If you modify dependencies or configurations:

```bash

docker-compose down && docker-compose build --no-cache && docker-compose up -d
--no-cache ensures a clean rebuild.
```
4. Stop the Application
```bash
//Stops and removes containers (keeps volumes for persistent DB storage).

docker-compose down
```

5. Runs the Application
```bash
//Runs the application in the background

docker-compose up -d
```

### API Documentation
#### Authentication
- Register: ```POST /api/auth/register```

- Login: ```POST /api/auth/login```

- Current User: ```GET /api/users/me```

#### Tasks (Requires Authentication)
- List Tasks: ```GET /api/tasks```

- Create Task: ```POST /api/tasks```

- Update Task: ```PUT /api/tasks/{task_id}```

- Delete Task: ```DELETE /api/tasks/{task_id}```

#### Users (For Testing Only)
- List Users: ```GET /api/users```

- Get User by ID: ```GET /api/users/{user_id}```

📌 Note: Use the FastAPI Swagger docs (/docs) for interactive testing.

## Database Management
#### Persistent Data
- PostgreSQL data is stored in a Docker volume (db_data).

- To reset the database, run:

```bash
docker-compose down -v
(⚠️ Warning: This deletes all data.)
```
#### Troubleshooting
- Common Issues
❌ Database connection fails

- Ensure PostgreSQL is running (docker ps).

Check logs:

```bash
docker-compose logs db
❌ CORS errors
```
- Verify frontend origins are allowed in ORIGINS.

❌ JWT token issues

- Ensure tokens are included in the Authorization: Bearer <token> header.

- Check token expiration (default: 30 minutes).

### Future Improvements
- Email verification

- Password reset

- Task categories & sharing

- Rate limiting

- Enhanced API documentation

## License
MIT License.

🚀 Happy Coding!
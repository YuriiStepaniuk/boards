# Small app for managing projects (Like Jira)

# 🛠 Technologies Used

# Frontend

React 18 with TypeScript

React Router for client-side routing

Redux Toolkit & RTK Query for state management and API calls

Tailwind CSS for styling

Prettier & ESLint for code formatting and linting

# Backend

NestJS (Node.js framework) with TypeScript

TypeORM for database ORM

PostgreSQL as the relational database

Environment-based config with .env files

RESTful API design

# DevOps & Deployment

Docker and Docker Compose for containerization

Railway for hosting PostgreSQL and backend services

Netlify for frontend hosting

GitHub for version control and CI/CD pipelines

Turborepo for monorepo management

## Running the Project with Docker

Make sure you have Docker and Docker Compose installed.

⚠️ Setup Environment Variables
Before starting, create and configure .env files in the project root and/or in the apps/server and apps/client folders as needed.
You can use the provided .env.example files as a template and fill in your own values.

1. In the project root, run:

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

This will start:

PostgreSQL database (container named postgres)

Backend server (container named myserver)

Frontend React app (container named myclient)

2. Access the frontend app at http://localhost:3000 (or whichever port you expose).

3. Backend API runs at http://localhost:3001 (or your configured backend port).

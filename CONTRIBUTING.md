# This docummentatios is in work in progress

# Contributing to Pets Love

Thank you for your interest in contributing to Pets Love! 🎉 This guide will help you get up and running with the development environment and provide some guidelines on contributing.

## Prerequisites

- Node.js v18
- Git

## Setting Up the Project

1. Fork the repository.
2. Create a folder to add the frontend and backend clone
3. Clone your fork of the repository to your local machine.
   ```sh
   git clone https://github.com/<your-username>/pets-love.git
   git clone https://github.com/<your-username>/api-pets-love.git
   ```
4. Create docker-compose.yaml
   ```sh
version: '3.8'
services:
  backend:
    build: ./api-pets-love
    ports:
      - '3011:3011'
    healthcheck:
      test: ["CMD", "nc", "-z", "", "8080"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - PORT=${PORT}
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
      - BUCKET_NAME=${BUCKET_NAME}
      - DEV=${DEV}
    networks:
      - pets_love_network
    depends_on:
      - db

  frontend:
    build: ./frontend_petsLove
    ports:
      - '3000:80'
    networks:
     - pets_love_network
    environment:
      - VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}
      - VITE_BUCKET_NAME=${VITE_BUCKET_NAME}
      - VITE_HOST=${VITE_HOST}
      - DEV=${DEV}
    depends_on:
      - backend

  db:
    image: postgres
    networks:
      - pets_love_network
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB${POSTGRES_DB}
    ports:
      - '5432:5432'
  
  # Define the Nginx service
  nginx:
    image: nginx:alpine
    build:
      context: ./nginx
      dockerfile: Dockerfile
    ports:
      - "80:80"
    volumes:
      - ./nginx:/etc/nginx/conf.d
    depends_on:
      - frontend
    networks:
      - pets_love_network


volumes:
  pgdata:

networks:
  pets_love_network:
    driver: bridge
   ```
4. Create .env
   ```sh
# backend
DATABASE_URL
PORT
HOST

BUCKET_NAME 
DEV 

GMAIL 
PASS 
GOOGLE_CLIENT_ID 
GOOGLE_CLIENT_SECRET 


# Frontend

VITE_GOOGLE_MAPS_API_KEY

VITE_BUCKET_NAME
VITE_HOST

DEV

# Database

POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
   ```
5. Run docker-compuse up build
   ```sh
   docker-compuse up build
   ```



<!--
## Coding Guidelines
- Please adhere to the coding conventions used throughout the project.
- Use ESLint and Prettier to format your code. You can run the linters using: -->

##Submitting Contributions

1. Create a new branch for your feature or bugfix.

```sh
   git checkout -b <branch-name>
```

2. Make your changes and commit them with a meaningful commit message.

```sh
   git commit -m "Brief description of changes made"
```

3. Push your branch to your fork on GitHub.

```sh
   git push origin <branch-name>
```

4. Create a pull request from your branch to the main repository.
   Please ensure that you have tested your changes thoroughly before submitting a pull request.

## Questions?

If you have any questions or run into any trouble, please create an issue in the GitHub repository. We appreciate your help in making Pets Love a better project!

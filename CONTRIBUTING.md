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

For run these projects you need use node v20 for frontend and node v18 for API
- install nodemodele with yarn
- Run the project with yarn run dev

In the backend you need run migrations with prisma 
   ```sh
   git clone https://github.com/<your-username>/pets-love.git
   git clone https://github.com/<your-username>/api-pets-love.git
   ```

4. Create docker-compose.yaml

The structure of the folder is: 
/pets-love
/api-pets-love
docker-compose.dev.yaml

In dev we need to create a DB with docker before to run the backend
```yaml
version: '3.8'
services:
  db-app:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: petslove
      POSTGRES_PASSWORD: 1234
      POSTGRES_DB: petslove
    ports:
      - "5432:5432"  # Map port 5432 on the host to port 5432 on the container
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

<<<<<<< Updated upstream
Frontend env
=======
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

>>>>>>> Stashed changes

```env
# Frontend
VITE_GOOGLE_MAPS_API_KEY=

VITE_BUCKET_NAME=http://localhost:3011/uploads/
VITE_HOST=http://localhost:3000/
VITE_BACKEND_URL=http://localhost:3011
DEV=true
```

Backend env

```env
# backend
DATABASE_URL=postgres://petslove:1234@localhost:5432/petslove

PORT=3011
HOST=http://localhost:3000
UPLOAD_DIR=

<<<<<<< Updated upstream
DEV=true

GMAIL=
PASS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

```
=======
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
   ```
   
5. Run docker-compuse up build
   ```sh
   docker-compuse up build
   ```
>>>>>>> Stashed changes


## Coding Guidelines
- Please adhere to the coding conventions used throughout the project.
- Use ESLint and Prettier to format your code. You can run the linters using:

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

# Stage 1: Build the React application
FROM node:20-buster-slim AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn cache clean
RUN yarn install --verbose

# Copy the rest of the code
COPY . .

# Build the project
RUN yarn build --verbose

# Stage 2: Serve the build with Nginx
FROM nginx:alpine

# Copy the build from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html


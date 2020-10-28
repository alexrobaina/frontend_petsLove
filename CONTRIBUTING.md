# 🐶 🐱 🦊 Contribute to Pets Love 🐭 🐹 🐰

If you're reading this, you probably really love animals 🐶 🐱 🦊
That's excellent, thank you for collaborating!

## How to contribute

1. We're open to contributions of all kinds. You can propose changes with pull requests (PR) or creating an issue.
2. Reporting bugs. 🐛
3. Improving the user experience design.
4. Improving translations.

## Running the project 🚀

1. Install nodejs v14.7.0 [https://nodejs.org/](https://nodejs.org/)
2. Making a fork of the project and clone it.
3. Execute `yarn` for installing dependencies (node-modules).
4. Execute `yarn start`

With the developer mode open localhost:3000 [http://localhost:3000](http://localhost:3000)

## Running the project using Docker 🐳

1. Install Docker
2. Making a fork of the project and clone it
3. Build image `docker build -t frontend_petslove:local .`
4. Create and run container `docker run -it --rm -v $(pwd):/app -v /app/node_modules -p 3000:3000 frontend_petslove:local yarn start`

## Pets Love API

If you want to set local back-end I suggest you go to the back-end repository

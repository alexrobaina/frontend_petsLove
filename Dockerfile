FROM node:14.12.0

ENV BROWSER none

WORKDIR  /app
COPY package.json .

RUN yarn

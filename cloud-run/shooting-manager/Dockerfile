# Build dependencies
FROM node:16 as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
COPY . . 
# Build production image
FROM dependencies as builder
EXPOSE 8080
RUN echo "npm run start running"
CMD npm run start
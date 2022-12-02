# Download base image
FROM node:18.9-alpine AS development

# Define Base Directory
WORKDIR /project/sawtooth-tuna/backend

# Copy and restore packages
COPY backend/package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install

# Copy all other directories
COPY backend/ ./

# Setup base command
RUN npm run build

# The test run is built on top of the dev run
FROM node:18.9-alpine AS test

# # Declaring working directory
WORKDIR /project/sawtooth-tuna/backend

COPY backend/package*.json ./
RUN npm install --slient --only=production

# #Copy build artifacts
COPY --from=development /project/sawtooth-tuna/backend/dist ./

# Enable exution of the test script
RUN chmod+x test/test.sh

# # Start the server
CMD [ "node", "main.js" ]
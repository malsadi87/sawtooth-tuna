# Download base image
FROM node:12-stretch AS development

# Define Base Directory
WORKDIR /project/sawtooth-tuna/backend

# Copy and restore packages
COPY backend/package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

# Copy all other directories
COPY backend/ ./

RUN yarn

RUN yarn global add @nestjs/cli

# Setup base command
RUN npm run build

# # # second phase
FROM node:12-stretch AS production

# # Declaring working directory
WORKDIR /project/sawtooth-tuna/backend

COPY backend/package*.json ./

RUN npm install --only=production

# #Copy build artifacts
COPY --from=builder /project/sawtooth-tuna/backend/dist ./
COPY --from=builder /project/sawtooth-tuna/backend/config ./config

# # Start the server
CMD [ "node", "main.js" ]
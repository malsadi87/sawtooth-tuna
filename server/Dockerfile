# Download base image
FROM node:10.24.1 AS development

# Define Base Directory
WORKDIR /project/sawtooth-tuna/server

# Copy and restore packages
COPY server/package*.json ./

RUN npm install 

EXPOSE 3005

CMD [ "npm", "start" ]

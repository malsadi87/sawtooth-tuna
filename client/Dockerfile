# pull official base image
FROM node:18.9-alpine

# set working directory
WORKDIR /project/sawtooth-tuna/client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /project/sawtooth-tuna/client/node_modules/.bin:$PATH

# install app dependencies
COPY client/package*.json ./
RUN npm install -g react-scripts
RUN npm install

# add app
COPY client/ ./

# start app
CMD ["npm", "start"]
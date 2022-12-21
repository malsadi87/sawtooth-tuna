# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /project/sawtooth-tuna/client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /project/sawtooth-tuna/client/node_modules/.bin:$PATH

# install app dependencies
COPY client/package*.json ./
RUN npm install
RUN npm install react-scripts@4.0.3 -g

# add app
COPY client/ ./

# start app
CMD ["npm", "start"]
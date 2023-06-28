# Use an official Node.js runtime as the base image
FROM node:12-alpine

# Set the working directory in the container
WORKDIR /vender

# Copy package.json and package-lock.json (if present)
COPY package.json ./

# Install app dependencies
RUN npm install

RUN npm install --save react-apexcharts apexcharts

RUN npm i react-hot-toast

# Copy the entire app source code
COPY . .

# Build the app
# RUN npm run build

# Set the command to run the app
CMD ["npm", "start"]

# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /Admin

# Copy package.json and package-lock.json (if present)
COPY package.json .

# Install app dependencies
RUN npm install


# Copy the entire app source code
COPY . .

# Set the command to run the app
CMD ["npm", "start"]

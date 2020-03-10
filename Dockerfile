# Use the official image as a parent image
# The official image containing NodeJs LTS interpreter and basic dependencies
FROM node:current-slim

# Set the working directory
# All subsuquent actions are taken from the directory below IN YOUR IMAGE AND NOT THE HOSTS FILESYSTEM
WORKDIR /usr/src/app

# Copy the file from your host to your current location
# copy package.json to /usr/src/app/package.json
COPY package.json .

# Run the command inside your image filesystem
# use npm install inside the filesystem (to install dependencies)
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the specified command within the container.
# Metadata on how to run a container based on this image
# containerized process is npm start
CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
# Copy everything else to the image filesystem
COPY . .
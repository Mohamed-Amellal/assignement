# Dockerfile

FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Copy the wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expose the port the app will run on
EXPOSE 3000

# Use the wait-for-it script to wait for MongoDB to be ready
CMD /wait-for-it.sh mongodb:27017 -- npm run start:prod

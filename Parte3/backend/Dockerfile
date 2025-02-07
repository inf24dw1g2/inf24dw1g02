# Use the official Node.js image for the backend
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend app
COPY . .

# Expose the port Loopback runs on (3001)
EXPOSE 3001

# Start the backend app
CMD ["npm", "start"]

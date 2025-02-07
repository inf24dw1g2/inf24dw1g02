# Use the official Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port React runs on (3000)
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]

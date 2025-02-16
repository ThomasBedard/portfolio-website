# Use a lightweight Node.js image for the builder
FROM node:16-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY ./ .

# Install dependencies before copying the entire source code
RUN npm install

# Copy all project files after dependencies are installed
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
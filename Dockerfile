# Use the official Node.js image (with a version that supports your frontend build)
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY . .

# Build your React app for production
RUN npm run build

# Expose the port that your frontend app should run on (replace 3000 with your desired port)
EXPOSE 3000

# Command to serve your frontend app
CMD ["npm", "start"]

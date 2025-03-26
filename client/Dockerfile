# Use an official Node.js image
FROM node:20

# Set working directory
WORKDIR /client

# Copy package files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy everything else
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start in production mode
CMD ["npm", "run", "start"]

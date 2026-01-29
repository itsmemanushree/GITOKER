FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy server code
COPY . .

EXPOSE 5000

CMD ["npm", "start"]

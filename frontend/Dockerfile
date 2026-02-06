# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies (lockfile not required)
RUN npm install

# Copy source code
COPY public ./public
COPY src ./src

# Build React app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

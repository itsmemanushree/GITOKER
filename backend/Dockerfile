# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies for SQLite3
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy server code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy only production dependencies and built code from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./
COPY --from=builder /app/.env* ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

CMD ["node", "server.js"]

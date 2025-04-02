FROM node:22.11.0-alpine

# Use the official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
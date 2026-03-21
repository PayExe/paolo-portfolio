FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Install curl for healthcheck
RUN apk add --no-cache curl

EXPOSE 8080

# Improved healthcheck with longer timeout and start period
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD curl --fail http://localhost:8080/ || exit 1

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]

FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]

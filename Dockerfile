# Multi-stage build for fullstack app

# Backend build
FROM node:18-alpine as backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY backend/src ./src

# Frontend build
FROM nginx:alpine as frontend
WORKDIR /app/frontend
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY frontend/src /usr/share/nginx/html

# Final image (example: backend only, or customize as needed)
FROM node:18-alpine
WORKDIR /app
COPY --from=backend /app/backend .
EXPOSE 3000
CMD ["node", "src/app.js"]

# To build frontend image, use the Dockerfile in frontend/ or extend this as needed.

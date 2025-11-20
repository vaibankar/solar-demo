FROM node:18-alpine AS build

WORKDIR /app

### Install backend deps
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

### Install & build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend . .
RUN npm run build

### Final Production Image
FROM node:18-alpine

WORKDIR /app/backend

ENV NODE_ENV=production

# Copy backend code
COPY backend . .

# Copy frontend build to backend public folder
COPY --from=build /app/frontend/dist ./public

# Install only prod modules
RUN npm install --only=production

EXPOSE 4000
CMD ["node", "src/server.js"]

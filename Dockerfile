# ============================
# 1. Base image
# ============================
FROM node:18-alpine AS base

WORKDIR /app

# ============================
# 2. Copy backend package files
# ============================
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# ============================
# 3. Copy frontend package files
# ============================
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# ============================
# 4. Copy source code
# ============================
COPY backend ./backend
COPY frontend ./frontend

# ============================
# 5. Build frontend
# ============================
RUN cd frontend && npm run build

# ============================
# 6. Move frontend build → backend/public
# ============================
RUN mkdir -p backend/public \
    && cp -r frontend/dist/* backend/public/

# ============================
# 7. Final stage (runtime)
# ============================
FROM node:18-alpine

WORKDIR /app

# Copy only backend (which now includes frontend build)
COPY --from=base /app/backend ./backend

WORKDIR /app/backend

EXPOSE 3000

CMD ["npm", "start"]

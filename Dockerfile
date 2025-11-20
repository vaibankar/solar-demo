#############################################
# 1️⃣ FRONTEND BUILD (React/Vue/Angular)
#############################################
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
COPY frontend . .
RUN npm run build


#############################################
# 2️⃣ BACKEND BUILD (Node.js API)
#############################################
FROM node:18-alpine AS backend-build

WORKDIR /app/backend
COPY backend/package*.json ./
COPY backend . .


#############################################
# 3️⃣ FINAL IMAGE (Nginx + Node + Supervisor)
#############################################
FROM alpine:latest

# Install nginx + node + supervisor
RUN apk add --no-cache nodejs npm nginx supervisor

WORKDIR /app

#############################
# Copy backend
#############################
COPY --from=backend-build /app/backend ./backend

#############################
# Copy frontend build to nginx html
#############################
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

#############################
# Supervisor config
#############################
RUN mkdir -p /etc/supervisor.d

COPY <<EOF /etc/supervisor.d/services.ini
[supervisord]
nodaemon=true

[program:backend]
command=node /app/backend/src/server.js
autostart=true
autorestart=true

[program:nginx]
command=nginx -g "daemon off;"
autostart=true
autorestart=true
EOF

EXPOSE 80     # Frontend via Nginx
EXPOSE 4000   # Backend API

CMD ["supervisord", "-c", "/etc/supervisor.d/services.ini"]

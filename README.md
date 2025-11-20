# Solar App - Full project

This repo contains a starter Solar application (frontend + backend) plus Kubernetes manifests.

## Quickstart (local Docker + kind/minikube)
1. Build images:
   - backend:
     ```
     cd backend
     docker build -t your-docker-registry/solar-backend:latest .
     ```
   - frontend:
     ```
     cd frontend
     docker build -t your-docker-registry/solar-frontend:latest .
     ```

2. Push images or load into local k8s (minikube/kind).

3. Apply k8s manifests:
   ```
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/mongo-pvc.yaml
   kubectl apply -f k8s/mongodb-deployment.yaml
   kubectl apply -f k8s/services.yaml
   kubectl apply -f k8s/backend-deployment.yaml
   kubectl apply -f k8s/frontend-deployment.yaml
   kubectl apply -f k8s/ingress.yaml
   ```

4. Edit /etc/hosts to point solar-app.local to your ingress IP.

## Notes
- Replace `your-docker-registry/...` with your registry.
- Use Secrets for JWT_SECRET and DB credentials in production.

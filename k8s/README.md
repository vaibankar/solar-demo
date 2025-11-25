# Kubernetes Deployment Guide

This directory contains Kubernetes manifest files for deploying the Timer Tools application.

## 📁 Files Overview

- **namespace.yaml** - Creates a dedicated namespace for the application
- **deployment.yaml** - Deploys the application with 2 replicas and health checks
- **service.yaml** - Exposes the application via LoadBalancer
- **ingress.yaml** - Optional ingress configuration for domain-based access
- **kustomization.yaml** - Kustomize configuration for managing all resources

## 🚀 Quick Start

### Prerequisites
- Kubernetes cluster (v1.19+)
- kubectl configured
- Docker image built and pushed to a registry

### Step 1: Build and Push Docker Image

```bash
# Build the image
docker build -t timer-tools:latest .

# Tag for your registry (replace with your registry)
docker tag timer-tools:latest your-registry/timer-tools:latest

# Push to registry
docker push your-registry/timer-tools:latest
```

### Step 2: Update Image in Deployment

Edit `deployment.yaml` and replace `timer-tools:latest` with your image:
```yaml
image: your-registry/timer-tools:latest
```

### Step 3: Deploy Using kubectl

#### Option A: Deploy All Resources
```bash
kubectl apply -f k8s/
```

#### Option B: Deploy Using Kustomize
```bash
kubectl apply -k k8s/
```

#### Option C: Deploy Individual Resources
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

## 🔍 Verify Deployment

### Check Pods
```bash
kubectl get pods -n timer-tools
```

### Check Services
```bash
kubectl get svc -n timer-tools
```

### Check Deployment
```bash
kubectl get deployment -n timer-tools
```

### View Logs
```bash
kubectl logs -f deployment/timer-tools -n timer-tools
```

## 🌐 Access the Application

### Using Service (LoadBalancer)
```bash
# Get external IP
kubectl get svc timer-tools-service -n timer-tools

# Access via external IP
curl http://<EXTERNAL-IP>
```

### Using Port Forward (for testing)
```bash
kubectl port-forward svc/timer-tools-service 8080:80 -n timer-tools
# Access at http://localhost:8080
```

### Using Ingress
1. Ensure you have an ingress controller installed (e.g., nginx-ingress)
2. Update `ingress.yaml` with your domain name
3. Add the domain to your `/etc/hosts` or DNS:
   ```
   <INGRESS-IP> timer-tools.local
   ```
4. Access at `http://timer-tools.local`

## 📊 Scaling

### Scale Manually
```bash
kubectl scale deployment timer-tools --replicas=3 -n timer-tools
```

### Auto-scaling (Optional)
Create an HPA (Horizontal Pod Autoscaler):
```bash
kubectl autoscale deployment timer-tools --cpu-percent=70 --min=2 --max=10 -n timer-tools
```

## 🔄 Updates

### Rolling Update
```bash
# Update image
kubectl set image deployment/timer-tools timer-tools=your-registry/timer-tools:v2 -n timer-tools

# Check rollout status
kubectl rollout status deployment/timer-tools -n timer-tools
```

### Rollback
```bash
kubectl rollout undo deployment/timer-tools -n timer-tools
```

## 🗑️ Cleanup

### Delete All Resources
```bash
kubectl delete -f k8s/
```

### Or using Kustomize
```bash
kubectl delete -k k8s/
```

### Delete Namespace (removes everything)
```bash
kubectl delete namespace timer-tools
```

## 🔧 Configuration

### Resource Limits
Edit `deployment.yaml` to adjust resource requests/limits:
```yaml
resources:
  requests:
    memory: "32Mi"
    cpu: "50m"
  limits:
    memory: "64Mi"
    cpu: "100m"
```

### Replicas
Change the number of replicas in `deployment.yaml`:
```yaml
spec:
  replicas: 2  # Change this number
```

### Service Type
- **ClusterIP** (default in deployment.yaml) - Internal only
- **LoadBalancer** (in service.yaml) - External access via cloud provider
- **NodePort** - Access via node IP and port

## 🔒 Security

### Network Policies (Optional)
Create a NetworkPolicy to restrict traffic:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: timer-tools-netpol
  namespace: timer-tools
spec:
  podSelector:
    matchLabels:
      app: timer-tools
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 80
```

## 📝 Notes

- The deployment includes liveness and readiness probes
- Health checks are configured to check the root path
- Default namespace is `timer-tools` (can be changed)
- Service uses LoadBalancer type for external access
- Ingress is optional and requires an ingress controller

## 🐛 Troubleshooting

### Pods Not Starting
```bash
# Check pod status
kubectl describe pod <pod-name> -n timer-tools

# Check events
kubectl get events -n timer-tools --sort-by='.lastTimestamp'
```

### Service Not Accessible
```bash
# Check service endpoints
kubectl get endpoints timer-tools-service -n timer-tools

# Test service from within cluster
kubectl run -it --rm debug --image=busybox --restart=Never -n timer-tools -- wget -qO- http://timer-tools-service
```

### Image Pull Errors
- Ensure image is pushed to accessible registry
- Check imagePullSecrets if using private registry
- Verify image name and tag in deployment.yaml


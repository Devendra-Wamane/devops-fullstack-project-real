# CI/CD Setup - GitHub Secrets

## Required Secrets in GitHub Repository Settings

Add these secrets in your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

### AWS Credentials
- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key

### Optional Secrets
- `SLACK_WEBHOOK`: For notifications
- `SONAR_TOKEN`: For SonarQube integration

## CI/CD Pipeline Features

### ✅ Continuous Integration (CI)
- **Backend**: Test, lint, security audit, Docker build
- **Frontend**: Test, build, Docker build  
- **Infrastructure**: Terraform validate & plan (no apply)
- **Security**: Trivy vulnerability scanning
- **Kubernetes**: Manifest validation

### ✅ Continuous Deployment (CD) - SIMULATION MODE
- **Build**: Docker images (push commented out)
- **Deploy**: Staging deployment simulation
- **Production**: Manual approval required

## Manual Deployment Commands

When you're ready to actually deploy:

```bash
# Push Docker images
docker push 905317843790.dkr.ecr.ap-south-1.amazonaws.com/devops-demo-api:latest

# Apply Terraform
cd terraform && terraform apply

# Deploy to Kubernetes  
kubectl apply -k k8s/base
```

## Pipeline Triggers

- **Push to main**: Full CI + CD simulation
- **Push to develop**: CI only
- **Pull requests**: CI validation
- **Manual**: Workflow dispatch

## Cost Optimization

✅ **No AWS resources created automatically**  
✅ **Terraform plan only (no apply)**  
✅ **Docker builds without pushing**  
✅ **Simulated deployments**

Uncomment deployment steps when ready for production!
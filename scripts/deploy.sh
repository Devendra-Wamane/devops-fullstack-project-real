#!/bin/bash

# ============================================================
# Deploy to AWS - Complete Infrastructure Setup
# ============================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🚀 Deploying to AWS..."
echo ""

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not configured. Run 'aws configure' first.${NC}"
    exit 1
fi

AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=${AWS_REGION:-us-east-1}

echo "📋 Configuration:"
echo "   AWS Account: $AWS_ACCOUNT_ID"
echo "   AWS Region: $AWS_REGION"
echo ""

# Step 1: Deploy Infrastructure with Terraform
echo "🏗️  Step 1: Deploying infrastructure with Terraform..."
echo "=================================================="
cd terraform

terraform init
terraform plan -out=tfplan
terraform apply tfplan

# Get outputs
CLUSTER_NAME=$(terraform output -raw cluster_name)
ECR_URL=$(terraform output -raw ecr_repository_url)

cd ..

# Step 2: Configure kubectl
echo ""
echo "☸️  Step 2: Configuring kubectl..."
echo "=================================================="
aws eks update-kubeconfig --region $AWS_REGION --name $CLUSTER_NAME

# Verify connection
kubectl cluster-info

# Step 3: Build and Push Docker Image
echo ""
echo "🐳 Step 3: Building and pushing Docker image..."
echo "=================================================="

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build image
docker build -t devops-demo-api:latest ./app

# Tag and push
docker tag devops-demo-api:latest $ECR_URL:latest
docker push $ECR_URL:latest

# Step 4: Deploy to Kubernetes
echo ""
echo "☸️  Step 4: Deploying to Kubernetes..."
echo "=================================================="

# Update image in deployment
cd k8s/base
sed -i "s|\${AWS_ACCOUNT_ID}|$AWS_ACCOUNT_ID|g" deployment.yaml
sed -i "s|\${AWS_REGION}|$AWS_REGION|g" deployment.yaml

cd ../..

# Apply manifests
kubectl apply -k k8s/base/

# Wait for deployment
echo "⏳ Waiting for deployment to be ready..."
kubectl rollout status deployment/devops-demo-api -n devops-demo --timeout=300s

# Step 5: Verify Deployment
echo ""
echo "✅ Step 5: Verifying deployment..."
echo "=================================================="
kubectl get pods -n devops-demo
kubectl get svc -n devops-demo
kubectl get ingress -n devops-demo

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "📝 Useful commands:"
echo "   kubectl logs -f deployment/devops-demo-api -n devops-demo"
echo "   kubectl get pods -n devops-demo -w"
echo "   kubectl port-forward svc/devops-demo-api 8080:80 -n devops-demo"
echo ""

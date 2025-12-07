# DevOps Full-Stack Project 🚀

A comprehensive DevOps project demonstrating industry best practices with **GitHub**, **Docker**, **Kubernetes**, **Terraform**, **AWS**, and **GitHub Actions**.

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              GitHub Repository                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│    ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────────┐   │
│    │   CI/CD     │───▶│   Docker    │───▶│         AWS ECR             │   │
│    │  Pipeline   │    │   Build     │    │   (Container Registry)      │   │
│    └─────────────┘    └─────────────┘    └──────────────┬──────────────┘   │
│                                                          │                  │
│    ┌─────────────────────────────────────────────────────▼─────────────┐   │
│    │                        AWS EKS Cluster                             │   │
│    │  ┌──────────────────────────────────────────────────────────────┐ │   │
│    │  │                    Kubernetes Namespace                       │ │   │
│    │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │ │   │
│    │  │  │  Pod 1  │  │  Pod 2  │  │  Pod 3  │  │  HPA (Auto-     │ │ │   │
│    │  │  │   API   │  │   API   │  │   API   │  │  scaling)       │ │ │   │
│    │  │  └────┬────┘  └────┬────┘  └────┬────┘  └─────────────────┘ │ │   │
│    │  │       └────────────┼────────────┘                            │ │   │
│    │  │                    ▼                                         │ │   │
│    │  │            ┌───────────────┐                                 │ │   │
│    │  │            │   Service     │                                 │ │   │
│    │  │            │  (ClusterIP)  │                                 │ │   │
│    │  │            └───────┬───────┘                                 │ │   │
│    │  │                    ▼                                         │ │   │
│    │  │            ┌───────────────┐                                 │ │   │
│    │  │            │   Ingress     │                                 │ │   │
│    │  │            │   (ALB)       │                                 │ │   │
│    │  │            └───────────────┘                                 │ │   │
│    │  └──────────────────────────────────────────────────────────────┘ │   │
│    └───────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
devops-fullstack-project/
├── app/                          # Node.js Application
│   ├── src/
│   │   └── index.js             # Main application file
│   ├── tests/
│   │   └── api.test.js          # API tests
│   ├── Dockerfile               # Multi-stage Docker build
│   ├── .dockerignore
│   └── package.json
│
├── k8s/                         # Kubernetes Manifests
│   └── base/
│       ├── namespace.yaml       # Namespace definition
│       ├── configmap.yaml       # Application configuration
│       ├── secret.yaml          # Sensitive data
│       ├── deployment.yaml      # Deployment with health checks
│       ├── service.yaml         # Service definitions
│       ├── ingress.yaml         # ALB Ingress
│       ├── hpa.yaml             # Horizontal Pod Autoscaler
│       ├── pdb.yaml             # Pod Disruption Budget
│       ├── serviceaccount.yaml  # RBAC configuration
│       └── kustomization.yaml   # Kustomize config
│
├── terraform/                   # Infrastructure as Code
│   ├── main.tf                  # Main infrastructure
│   ├── variables.tf             # Variable definitions
│   ├── outputs.tf               # Output values
│   ├── providers.tf             # Provider configuration
│   └── terraform.tfvars         # Variable values
│
├── .github/                     # GitHub Actions
│   └── workflows/
│       ├── ci.yml               # Continuous Integration
│       ├── cd.yml               # Continuous Deployment
│       └── terraform.yml        # Infrastructure pipeline
│
├── nginx/
│   └── nginx.conf               # Nginx reverse proxy config
│
├── docker-compose.yml           # Local development setup
└── README.md                    # This file
```

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **Node.js** | Backend API application |
| **Docker** | Containerization |
| **Kubernetes** | Container orchestration |
| **Terraform** | Infrastructure as Code |
| **AWS EKS** | Managed Kubernetes |
| **AWS ECR** | Container registry |
| **AWS VPC** | Network infrastructure |
| **GitHub Actions** | CI/CD automation |

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [AWS CLI](https://aws.amazon.com/cli/) configured
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed
- [Terraform](https://www.terraform.io/downloads) installed
- [Node.js 20+](https://nodejs.org/) installed

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devendra-Wamane/devops-fullstack-project.git
   cd devops-fullstack-project
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Or run locally**
   ```bash
   cd app
   npm install
   npm run dev
   ```

4. **Access the API**
   ```bash
   curl http://localhost:3000/health
   curl http://localhost:3000/api/items
   ```

## 🏗️ Infrastructure Setup

### Step 1: Deploy AWS Infrastructure

```bash
cd terraform

# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Apply the infrastructure
terraform apply
```

### Step 2: Configure kubectl

```bash
# Get the command from Terraform output
aws eks update-kubeconfig --region us-east-1 --name devops-demo
```

### Step 3: Deploy to Kubernetes

```bash
# Apply all manifests
kubectl apply -k k8s/base/

# Verify deployment
kubectl get pods -n devops-demo
kubectl get svc -n devops-demo
```

## 🔄 CI/CD Pipeline

### Continuous Integration (CI)

Triggered on: Push to `main`/`develop`, Pull requests

1. ✅ Run tests and linting
2. 🔒 Security scanning (Trivy, npm audit)
3. 🐳 Build Docker image
4. 📊 Upload coverage reports

### Continuous Deployment (CD)

Triggered on: Push to `main`

1. 🔐 Authenticate with AWS (OIDC)
2. 🐳 Build and push to ECR
3. ☸️ Deploy to EKS
4. ✅ Run smoke tests
5. 📢 Send notifications

### Infrastructure Pipeline

Triggered on: Changes to `terraform/`

1. ✅ Validate Terraform code
2. 🔒 Security scan (tfsec, Checkov)
3. 📋 Generate plan
4. 🚀 Apply changes (on main)

## 🔐 GitHub Secrets Required

Configure these secrets in your GitHub repository:

| Secret | Description |
|--------|-------------|
| `AWS_ROLE_ARN` | IAM role ARN for GitHub Actions |
| `AWS_ACCOUNT_ID` | Your AWS account ID |
| `SLACK_WEBHOOK_URL` | (Optional) Slack notifications |

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/health` | Health check (liveness) |
| GET | `/ready` | Readiness check |
| GET | `/api/info` | Application info |
| GET | `/api/items` | List all items |
| GET | `/api/items/:id` | Get item by ID |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

## 📊 Monitoring & Observability

- **Health Checks**: Liveness and readiness probes configured
- **Logging**: Structured logging with Morgan
- **Metrics**: Ready for Prometheus scraping
- **Tracing**: Can integrate with AWS X-Ray

## 🔒 Security Features

- ✅ Non-root container user
- ✅ Read-only root filesystem
- ✅ Security headers with Helmet.js
- ✅ Image vulnerability scanning
- ✅ RBAC with service accounts
- ✅ Network policies support
- ✅ Secrets management

## 🧪 Testing

```bash
cd app

# Run all tests
npm test

# Run with coverage
npm run test -- --coverage

# Run specific test
npm test -- --testPathPattern=api.test.js
```

## 📈 Scaling

The application supports both horizontal and vertical scaling:

- **HPA**: Automatically scales pods based on CPU/memory
- **Cluster Autoscaler**: Scales EKS nodes as needed
- **Load Balancer**: AWS ALB distributes traffic

## 💰 Cost Optimization Tips

1. Use Spot instances for non-production workloads
2. Enable cluster autoscaler
3. Use single NAT Gateway in non-production
4. Set up ECR lifecycle policies
5. Use Reserved Instances for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Devendra Wamane**
- GitHub: [@Devendra-Wamane](https://github.com/Devendra-Wamane)

## 🙏 Acknowledgments

- AWS Documentation
- Kubernetes Documentation
- Terraform Registry
- GitHub Actions Documentation

---

⭐ **Star this repo if you found it helpful!** ⭐

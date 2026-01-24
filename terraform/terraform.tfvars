aws_region = "ap-south-1"
project_name = "devops-demo"
environment = "production"
vpc_cidr = "10.0.0.0/16"
availability_zones = ["ap-south-1a", "ap-south-1b", "ap-south-1c"]
private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
public_subnets = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

# EKS Configuration
cluster_version = "1.28"
node_instance_types = ["t3.medium"]
node_desired_size = 2
node_min_size = 1
node_max_size = 5

# ECR Configuration
ecr_image_tag_mutability = "MUTABLE"
ecr_scan_on_push = true

# GitHub Configuration
github_org = "Devendra-Wamane"
github_repo = "devops-fullstack-project"

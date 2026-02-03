# Access entry already exists - managed outside of Terraform
# resource "aws_eks_access_entry" "admin" {
#   cluster_name  = var.cluster_name
#   principal_arn = var.principal_arn
#   type          = "STANDARD"
# }
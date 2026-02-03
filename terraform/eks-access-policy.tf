resource "aws_eks_access_policy_association" "admin_policy" {
  cluster_name  = var.cluster_name
  principal_arn = var.principal_arn
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"

  access_scope {
    type = "cluster"
  }

  # Access entry already exists
}
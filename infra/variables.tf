variable "location" {
  description = "Ubicación de los recursos en Azure"
  type        = string
  default     = "East US"
}

variable "frontend_app_name" {
  description = "Nombre de la app frontend"
  type        = string
  default     = "frontend-app-monorepo"
}

variable "backend_app_name" {
  description = "Nombre de la app backend"
  type        = string
  default     = "backend-app-monorepo"
}

output "frontend_url" {
  description = "URL del frontend"
  value       = azurerm_app_service.frontend_app.default_site_hostname
}

output "backend_url" {
  description = "URL del backend"
  value       = azurerm_app_service.backend_app.default_site_hostname
}

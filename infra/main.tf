provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "monorepo-rg"
  location = "East US"
}

# Frontend App Service Plan
resource "azurerm_app_service_plan" "frontend_plan" {
  name                = "frontend-plan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku {
    tier = "Free"
    size = "F1"
  }
}

# Backend App Service Plan
resource "azurerm_app_service_plan" "backend_plan" {
  name                = "backend-plan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku {
    tier = "Free"
    size = "F1"
  }
}

# Frontend App Service
resource "azurerm_app_service" "frontend_app" {
  name                = "frontend-app-monorepo"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.frontend_plan.id
}

# Backend App Service
resource "azurerm_app_service" "backend_app" {
  name                = "backend-app-monorepo"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.backend_plan.id
}

output "frontend_url" {
  value = azurerm_app_service.frontend_app.default_site_hostname
}

output "backend_url" {
  value = azurerm_app_service.backend_app.default_site_hostname
}

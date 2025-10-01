# main.tf

provider "azurerm" {
  features {}

  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}


# 1️⃣ Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "monorepo-rg"
  location = "Canada Central"  # cambia si quieres otra región
}

# 2️⃣ Service Plan
resource "azurerm_service_plan" "plan" {
  name                = "example-plan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  os_type  = "Linux"
  sku_name = "B1"
}


# 3️⃣ Frontend Web App
resource "azurerm_linux_web_app" "frontend" {
  name                = "frontend-affi-${random_integer.suffix.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    application_stack {
      node_version = "20-lts"
    }
  }
}


# 4️⃣ Backend Web App
resource "azurerm_linux_web_app" "backend" {
  name                = "backend-affi-${random_integer.suffix.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    application_stack {
      node_version = "20-lts"
    }
  }
}

resource "random_integer" "suffix" {
  min = 10000
  max = 99999
}
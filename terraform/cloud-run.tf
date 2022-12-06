resource "google_project_service" "run_api" {
  service = "run.googleapis.com"

  disable_on_destroy = true
}

resource "google_cloud_run_service" "shooting_manager" {
  name = "shooting-manager"
  location = var.region

  template {
    spec {
      containers {
        image = "${local.shooting_manager_tag}:${local.shooting_manager_ver}"
        env {
          name = "MODE"
          value = "production"
        }
      }
      container_concurrency = 80
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  # Waits for the Cloud Run API to be enabled
  depends_on = [google_project_service.run_api]
}

resource "google_cloud_run_service_iam_member" "run_all_users" {
  service  = google_cloud_run_service.shooting_manager.name
  location = google_cloud_run_service.shooting_manager.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "service_url" {
  value = google_cloud_run_service.shooting_manager.status[0].url
}
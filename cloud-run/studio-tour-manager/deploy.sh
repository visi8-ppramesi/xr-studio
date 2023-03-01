version=${1:-0.0.1}
if [[ $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    docker build -t asia.gcr.io/xr-studio-a9c5e/studio-tour-manager:$version .
    docker push asia.gcr.io/xr-studio-a9c5e/studio-tour-manager:$version

    gcloud run deploy \
        --image asia.gcr.io/xr-studio-a9c5e/studio-tour-manager:$version \
        --update-env-vars "MODE=production" \
        --port 8080 \
        --concurrency 80 \
        --allow-unauthenticated \
        --region asia-southeast2 \
        --project "xr-studio-a9c5e"
else
    echo "Invalid version string"
fi